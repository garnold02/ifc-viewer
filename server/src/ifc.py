from ifcopenshell import entity_instance, open as ifc_open
from ifcopenshell import geom as ifc_geom
from multiprocessing import cpu_count


def _extract_hierarchy():
    print("    Extracting hierarchy...")
    global hierarchy

    def collect(entity: entity_instance):
        children = []

        for rel in file.by_type("IfcRelAggregates"):
            if rel.RelatingObject != entity:
                continue
            
            for child in rel.RelatedObjects:
                children.append(collect(child))
        
        for rel in file.by_type("IfcRelContainedInSpatialStructure"):
            if rel.RelatingStructure != entity:
                continue
            
            for child in rel.RelatedElements:
                children.append(collect(child))
        
        return {
            "id": entity.id(),
            "type": entity.is_a(),
            "name": entity.Name,
            "children": children
        }


    project_entity = file.by_type("IfcProject")[0]
    hierarchy = collect(project_entity)


def _build_geometries():
    print("    Building geometries...")
    global geometries
    geometries = {}
    
    settings = ifc_geom.settings()
    iterator = ifc_geom.iterator(settings, file, cpu_count())

    if not iterator.initialize():
        print("ERROR: Couldn't initialize geometry iterator!")
        return

    while True:
        shape = iterator.get()
        positions = []

        for i in shape.geometry.faces:
            positions.append(shape.geometry.verts[i])
        
        if not shape.id in geometries:
            geometries[shape.id] = {
                "type": shape.type,
                "shapes": [],
            }
        
        geometries[shape.id]["shapes"].append({
            "transform": shape.transformation.matrix,
            "positions": positions,
        })

        if not iterator.next():
            break


def load(path: str):
    global file
    print(f"Loading IFC from `{path}`...")
    file = ifc_open(path)
    _extract_hierarchy()
    _build_geometries()
    print("IFC loaded!")
