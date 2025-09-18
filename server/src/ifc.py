from ifcopenshell import open as ifc_open
from ifcopenshell import geom as ifc_geom
from math import isnan
from multiprocessing import cpu_count
import numpy as np
from time import time


def _build_geometry():
    print("    Building geometry...")
    global geometry
    geometry = {}
    
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
            normal = np.divide(cprod, np.sqrt(np.sum(cprod ** 2)))

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
    
    print("        DONE")


def _build_hierarchy():
    print("    Building hierarchy...")
    global hierarchy

    def collect(e):
        geom = None
        if e.id() in geometry:
            geom = geometry[e.id()]

        children = []

        for rel in file.by_type("IfcRelAggregates"):
            if rel.RelatingObject != e:
                continue
            
            for child in rel.RelatedObjects:
                children.append(collect(child))
        
        for rel in file.by_type("IfcRelContainedInSpatialStructure"):
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

    project = file.by_type("IfcProject")[0]
    hierarchy = collect(project)
    print("        DONE")


def load(path: str):
    global file
    print(f"Loading IFC from `{path}`...")
    start = time()
    print("    Opening file...")
    file = ifc_open(path)
    print("        DONE")
    _build_geometry()
    _build_hierarchy()
    end = time()
    print(f"IFC loaded! Took {round(end - start, 2)} seconds")
