from ifcopenshell import entity_instance, open as ifc_open
from ifcopenshell import geom as ifc_geom
from math import isnan
from multiprocessing import cpu_count
import numpy as np
from time import time


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
    geometries = []
    
    settings = ifc_geom.settings()
    iterator = ifc_geom.iterator(settings, file, cpu_count())

    if not iterator.initialize():
        print("ERROR: Couldn't initialize geometry iterator!")
        return

    while True:
        shape = iterator.get()
        positions = []
        normals = []
        colors = []

        for face_index in range(0, len(shape.geometry.faces) // 3):
            material = shape.geometry.materials[
                shape.geometry.material_ids[
                    face_index
                ]
            ]

            transparency = material.transparency
            if isnan(transparency):
                transparency = 1.0
            
            opacity = 1.0 - transparency

            color = [
                material.diffuse.r(),
                material.diffuse.g(),
                material.diffuse.b(),
                opacity,
            ]

            vertex_indices = [
                shape.geometry.faces[face_index * 3],
                shape.geometry.faces[face_index * 3 + 1],
                shape.geometry.faces[face_index * 3 + 2],
            ]

            vertices = [
                [
                    shape.geometry.verts[i * 3],
                    shape.geometry.verts[i * 3 + 1],
                    shape.geometry.verts[i * 3 + 2],
                ]
                for i in vertex_indices
            ]

            edge0 = np.subtract(vertices[1], vertices[0])
            edge1 = np.subtract(vertices[2],vertices[0])
            cprod = np.cross(edge1, edge0)
            normal = np.divide(cprod, np.sqrt(np.sum(cprod ** 2)))

            for vertex in vertices:
                for position in vertex:
                    positions.append(position)
                
                for coord in normal:
                    normals.append(coord)
                
                for channel in color:
                    colors.append(channel)
        
        # Only enable transparency if there actually are transparent faces
        transparent = any(a < 1.0 for a in colors[3::4])
        
        geometries.append({
            "id": shape.id,
            "type": shape.type,
            "transform": shape.transformation.matrix,
            "positions": positions,
            "normals": normals,
            "colors": colors,
            "transparent": transparent,
        })

        if not iterator.next():
            break


def load(path: str):
    global file
    print(f"Loading IFC from `{path}`...")
    start = time()
    file = ifc_open(path)
    _extract_hierarchy()
    _build_geometries()
    end = time()
    print(f"IFC loaded! Took {round(end - start, 2)} seconds")
