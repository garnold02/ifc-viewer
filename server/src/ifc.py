from ifcopenshell import entity_instance as ifc_entity, file as ifc_file, geom as ifc_geom, open as ifc_open
from math import isnan
from multiprocessing import cpu_count
import numpy as np
import os.path
import struct
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

            if not iterator.initialize():
                print("    ERROR: Couldn't initialize geometry iterator!")
                return

            while True:
                shape = iterator.get()
                materials = shape.geometry.materials
                material_ids = shape.geometry.material_ids
                faces = shape.geometry.faces
                verts = shape.geometry.verts
                meshes = {}

                for material_id in material_ids:
                    material = materials[material_id]
                    transparency = material.transparency

                    if isnan(transparency):
                        transparency = 0.0
                    
                    diffuse = material.diffuse
                    r = diffuse.r()
                    g = diffuse.g()
                    b = diffuse.b()
                    a = 1.0 - transparency

                    meshes[material_id] = {
                        "r": r,
                        "g": g,
                        "b": b,
                        "a": a,
                        "positions": [],
                        "normals": [],
                    }

                for face_index in range(0, len(faces) // 3):
                    material_id = material_ids[face_index]
                    mesh = meshes[material_id]
                    positions = mesh["positions"]
                    normals = mesh["normals"]

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
                
                geometry[shape.id] = {
                    "transform": shape.transformation.matrix,
                    "meshes": list(meshes.values()),
                }

                if not iterator.next():
                    break
            
            print("    DONE")
            return geometry
        

    def _process_hierarchy(self, geometry: dict) -> bytearray:
        self.load()

        with self.lock:
            print(f"Processing hierarchy of `{self.file_name}`...")

            def collect(e: ifc_entity) -> bytearray:
                buffer = bytearray()

                # id
                buffer += struct.pack("<I", e.id())

                # type
                type = e.is_a().encode()
                buffer += struct.pack("<I", len(type))
                buffer += type

                # name
                name: str = e.Name
                if name == None:
                    buffer += struct.pack("<I", 0)
                else:
                    name: bytes = name.encode()
                    buffer += struct.pack("<I", len(name))
                    buffer += name
                
                # geometry

                if e.id() in geometry:
                    buffer += struct.pack("<?", True)

                    object = geometry[e.id()]
                    transform = object["transform"]
                    meshes = object["meshes"]

                    for scalar in transform:
                        buffer += struct.pack("<f", scalar)
                    
                    buffer += struct.pack("<I", len(meshes))

                    for mesh in meshes:
                        buffer += struct.pack("<f", mesh["r"])
                        buffer += struct.pack("<f", mesh["g"])
                        buffer += struct.pack("<f", mesh["b"])
                        buffer += struct.pack("<f", mesh["a"])

                        positions = mesh["positions"]
                        buffer += struct.pack("<I", len(positions))

                        for coordinate in positions:
                            buffer += struct.pack("<f", coordinate)
                        
                        normals = mesh["normals"]
                        buffer += struct.pack("<I", len(normals))
                        
                        for coordinate in normals:
                            buffer += struct.pack("<f", coordinate)
                else:
                    buffer += struct.pack("<?", False)

                # children

                children = []

                for rel in self.file.by_type("IfcRelAggregates"):
                    if rel.RelatingObject != e:
                        continue
                    
                    for child in rel.RelatedObjects:
                        children.append(child)
                
                for rel in self.file.by_type("IfcRelContainedInSpatialStructure"):
                    if rel.RelatingStructure != e:
                        continue
                    
                    for child in rel.RelatedElements:
                        children.append(child)
                
                buffer += struct.pack("<I", len(children))
                for child in children:
                    buffer += collect(child)
                
                return buffer

            project = self.file.by_type("IfcProject")[0]
            buffer = collect(project)

            print("    DONE")
            return buffer
    

    def _create_preview(self, geometry: dict):
        print(f"Creating preview for `{self.file_name}`...")
        buffer = bytearray()
        buffer += struct.pack("<I", len(geometry))
        
        for object in geometry.values():
            transform = object["transform"]
            meshes = object["meshes"]

            for scalar in transform:
                struct.pack("<f", scalar)

            buffer += struct.pack("<I", len(meshes))

            for mesh in meshes:
                buffer += struct.pack("<f", mesh["r"])
                buffer += struct.pack("<f", mesh["g"])
                buffer += struct.pack("<f", mesh["b"])
                buffer += struct.pack("<f", mesh["a"])

                positions = mesh["positions"]
                buffer += struct.pack("<I", len(positions))

                for coordinate in positions:
                    buffer += struct.pack("<f", coordinate)
                
                normals = mesh["normals"]
                buffer += struct.pack("<I", len(normals))
                
                for coordinate in normals:
                    buffer += struct.pack("<f", coordinate)
        
        print("    DONE")
        return buffer

    
    def process(self):
        tree_exists = os.path.isfile(f"files/{self.file_name}.tree.bin")
        preview_exists = os.path.isfile(f"files/{self.file_name}.preview.bin")
        
        if tree_exists and preview_exists:
            return

        geometry = self._process_geometry()
        hierarchy = self._process_hierarchy(geometry=geometry)
        preview = self._create_preview(geometry=geometry)

        with open(f"files/{self.file_name}.tree.bin", "wb") as f:
            f.write(hierarchy)
        
        with open(f"files/{self.file_name}.preview.bin", "wb") as f:
            f.write(preview)


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
