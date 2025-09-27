from ifcopenshell import entity_instance as ifc_entity, file as ifc_file, geom as ifc_geom, open as ifc_open
import json
from math import isnan
from multiprocessing import cpu_count
import numpy as np
import os.path
from threading import Lock


class Ifc:
    lock: Lock = Lock()
    file_name: str = None
    file: ifc_file = None


    def __init__(self, file_name: str):
        self.file_name = file_name
    

    def load(self):
        with self.lock:
            if self.file != None:
                return

            print(f"Loading `{self.file_name}`...")
            self.file = ifc_open(f"files/{self.file_name}")
            print("    DONE")
    

    def unload(self):
        with self.lock:
            if self.file == None:
                return
            
            print(f"Unloading `{self.file_name}`...")
            self.file = None
            print("    DONE")
    

    def _process_geometry(self) -> dict:
        self.load()

        with self.lock:
            print(f"Processing geometry of `{self.file_name}`...")
            geometry = {}
            
            settings = ifc_geom.settings()
            iterator = ifc_geom.iterator(settings, self.file, cpu_count())
            serializer_settings = ifc_geom.serializer_settings()
            serializer = ifc_geom.serializers.gltf(
                f"files/{self.file_name}.preview.glb",
                settings,
                serializer_settings,
            )

            if not iterator.initialize():
                print("    ERROR: Couldn't initialize geometry iterator!")
                return
            
            serializer.setFile(self.file)
            serializer.setUnitNameAndMagnitude("METER", 1.0)
            serializer.writeHeader()

            while True:
                shape = iterator.get()

                ent = self.file.by_id(shape.id)
                if not ent.is_a("IfcSpace") and not ent.is_a("IfcOpeningElement"):
                    serializer.write(iterator.get())

                positions = []
                normals = []
                colors = []
                transparent = False

                materials = shape.geometry.materials
                material_ids = shape.geometry.material_ids
                faces = shape.geometry.faces
                verts = shape.geometry.verts

                for face_index in range(0, len(faces) // 3):
                    material = materials[material_ids[face_index]]
                    transparency = material.transparency

                    if isnan(transparency):
                        transparency = 0.0
                    
                    diffuse = material.diffuse
                    color_r = diffuse.r()
                    color_g = diffuse.g()
                    color_b = diffuse.b()
                    color_a = 1.0 - transparency

                    if color_a < 1.0:
                        transparent = True

                    f_i = face_index * 3
                    vertex_index_0 = faces[f_i]
                    vertex_index_1 = faces[f_i + 1]
                    vertex_index_2 = faces[f_i + 2]

                    v_i_0 = vertex_index_0 * 3
                    vertex_0_0 = verts[v_i_0]
                    vertex_0_1 = verts[v_i_0 + 1]
                    vertex_0_2 = verts[v_i_0 + 2]
                    v_i_1 = vertex_index_1 * 3
                    vertex_1_0 = verts[v_i_1]
                    vertex_1_1 = verts[v_i_1 + 1]
                    vertex_1_2 = verts[v_i_1 + 2]
                    v_i_2 = vertex_index_2 * 3
                    vertex_2_0 = verts[v_i_2]
                    vertex_2_1 = verts[v_i_2 + 1]
                    vertex_2_2 = verts[v_i_2 + 2]

                    vertex_0 = np.array([vertex_0_0, vertex_0_1, vertex_0_2])
                    vertex_1 = np.array([vertex_1_0, vertex_1_1, vertex_1_2])
                    vertex_2 = np.array([vertex_2_0, vertex_2_1, vertex_2_2])
                    
                    edge0 = np.subtract(vertex_1, vertex_0)
                    edge1 = np.subtract(vertex_2, vertex_0)
                    cprod = np.cross(edge1, edge0)
                    normal = -np.divide(cprod, np.sqrt(np.sum(cprod ** 2)))

                    positions.append(vertex_0_0)
                    positions.append(vertex_0_1)
                    positions.append(vertex_0_2)
                    positions.append(vertex_1_0)
                    positions.append(vertex_1_1)
                    positions.append(vertex_1_2)
                    positions.append(vertex_2_0)
                    positions.append(vertex_2_1)
                    positions.append(vertex_2_2)

                    normal_0 = normal[0]
                    normal_1 = normal[1]
                    normal_2 = normal[2]
                    normals.append(normal_0)
                    normals.append(normal_1)
                    normals.append(normal_2)
                    normals.append(normal_0)
                    normals.append(normal_1)
                    normals.append(normal_2)
                    normals.append(normal_0)
                    normals.append(normal_1)
                    normals.append(normal_2)

                    colors.append(color_r)
                    colors.append(color_g)
                    colors.append(color_b)
                    colors.append(color_a)
                    colors.append(color_r)
                    colors.append(color_g)
                    colors.append(color_b)
                    colors.append(color_a)
                    colors.append(color_r)
                    colors.append(color_g)
                    colors.append(color_b)
                    colors.append(color_a)
                
                geometry[shape.id] = {
                    "transform": shape.transformation.matrix,
                    "positions": positions,
                    "normals": normals,
                    "colors": colors,
                    "transparent": transparent,
                }

                if not iterator.next():
                    break
            
            serializer.finalize()
            print("    DONE")
            return geometry
        

    def _process_hierarchy(self, geometry: dict) -> dict:
        self.load()

        with self.lock:
            print(f"Processing hierarchy of `{self.file_name}`...")

            def collect(e):
                geom = None
                if e.id() in geometry:
                    geom = geometry[e.id()]

                children = []

                for rel in self.file.by_type("IfcRelAggregates"):
                    if rel.RelatingObject != e:
                        continue
                    
                    for child in rel.RelatedObjects:
                        children.append(collect(child))
                
                for rel in self.file.by_type("IfcRelContainedInSpatialStructure"):
                    if rel.RelatingStructure != e:
                        continue
                    
                    for child in rel.RelatedElements:
                        children.append(collect(child))

                return {
                    "id": e.id(),
                    "type": e.is_a(),
                    "name": e.Name,
                    "geometry": geom,
                    "children": children,
                }

            project = self.file.by_type("IfcProject")[0]
            hierarchy = collect(project)

            print("    DONE")
            return hierarchy

    
    def process(self):
        tree_exists = os.path.isfile(f"files/{self.file_name}.tree.json")
        preview_exists = os.path.isfile(f"files/{self.file_name}.preview.glb")
        
        if tree_exists and preview_exists:
            return

        geometry = self._process_geometry()
        hierarchy = self._process_hierarchy(geometry=geometry)

        with open(f"files/{self.file_name}.tree.json", "w") as f:
            f.write(json.dumps(hierarchy, separators=(",", ":")))


def _xform_pset_prop(prop: ifc_entity) -> dict:
    # `prop` is an `IfcProperty`

    name = prop.Name
    description = prop.Description
    value = None

    if prop.is_a("IfcComplexProperty"):
        # TODO: handle `IfcComplexProperty`
        value = {
            "type": "complex",
            "complex": "TODO",
        }

    # handle subtypes of `IfcSimpleProperty`

    if prop.is_a("IfcPropertyBoundedValue"):
        # TODO: handle `IfcPropertyBoundedValue`
        value = {
            "type": "bounded",
            "bounded": "TODO",
        }

    if prop.is_a("IfcPropertyEnumeratedValue"):
        # TODO: handle `IfcPropertyEnumeratedValue`
        value = {
            "type": "enumerated",
            "enumerated": "TODO",
        }

    if prop.is_a("IfcPropertyListValue"):
        # TODO: handle `IfcPropertyListValue`
        value = {
            "type": "list",
            "list": "TODO",
        }

    if prop.is_a("IfcPropertyReferenceValue"):
        # TODO: handle `IfcPropertyReferenceValue`
        value = {
            "type": "reference",
            "reference": "TODO",
        }

    if prop.is_a("IfcPropertySingleValue"):
        if prop.NominalValue != None:
            value = {
                "type": "single",
                "single": prop.NominalValue.wrappedValue,
            }

    if prop.is_a("IfcPropertyTableValue"):
        # TODO: handle `IfcPropertyTableValue`
        value = {
            "type": "table",
            "table": "TODO"
        }

    return {
        "name": name,
        "description": description,
        "value": value,
    }


def _xform_pset_quan(quan: ifc_entity) -> dict:
    # `quan` is an `IfcPhysicalQuantity`
    
    name = quan.Name
    description = quan.Description
    value = None

    if quan.is_a("IfcPhysicalComplexQuantity"):
        # TODO: handle `IfcPhysicalComplexQuantity`
        value = {
            "type": "complex",
            "complex": "TODO"
        }

    # handle subtypes of `IfcPhysicalSimpleQuantity`

    # apparently `Formula` only exists in IFC4. fallback to `None`.
    formula = None
    try:
        formula = quan.Formula
    except AttributeError:
        pass

    if quan.is_a("IfcQuantityArea"):
        value = {
            "type": "area",
            "area": quan.AreaValue,
            "formula": formula,
        }

    if quan.is_a("IfcQuantityCount"):
        value = {
            "type": "count",
            "count": quan.CountValue,
            "formula": formula,
        }

    if quan.is_a("IfcQuantityLength"):
        value = {
            "type": "length",
            "length": quan.LengthValue,
            "formula": formula,
        }

    if quan.is_a("IfcQuantityTime"):
        value = {
            "type": "time",
            "time": quan.TimeValue,
            "formula": formula,
        }

    if quan.is_a("IfcQuantityVolume"):
        value = {
            "type": "volume",
            "volume": quan.VolumeValue,
            "formula": formula,
        }

    if quan.is_a("IfcQuantityWeight"):
        value = {
            "type": "weight",
            "weight": quan.WeightValue,
            "formula": formula,
        }

    return {
        "name": name,
        "description": description,
        "value": value,
    }


def xform_pset(pset: ifc_entity) -> dict:
    # for now, we assume `pset` must be an `IfcPropertySetDefinition`

    name = pset.Name
    properties = []

    if pset.is_a("IfcPreDefinedPropertySet"):
        # TODO: handle `IfcPreDefinedPropertySet`
        pass

    # property sets only have this one type
    if pset.is_a("IfcPropertySet"):
        for prop in pset.HasProperties:
            # `prop` is an `IfcProperty`
            properties.append(_xform_pset_prop(prop))

    # quantity sets (`IfcQuantitySet`) *can* have multiple subtypes, handle them here
    # even though as of IFC4, the only subtype is `IfcElementQuantity`
    if pset.is_a("IfcElementQuantity"):
        for quan in pset.Quantities:
            # `quan` is an `IfcPhysicalQuantity`
            properties.append(_xform_pset_quan(quan))

    return {
        "name": name,
        "properties": properties,
    }
