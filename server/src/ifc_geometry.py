from binpacker import BinPacker
import math
import multiprocessing
from typing import Any
from ifcopenshell import file as ifc_file
from ifcopenshell.geom import settings as ifc_geom_settings, iterator as ifc_geom_iterator
import numpy as np


class IfcMesh:
    color_r: float
    color_g: float
    color_b: float
    color_a: float
    positions: list[float]
    normals: list[float]


    def pack(self) -> BinPacker:
        packer = BinPacker()
        packer.pack_float32(self.color_r)
        packer.pack_float32(self.color_g)
        packer.pack_float32(self.color_b)
        packer.pack_float32(self.color_a)
        packer.pack_uint32(len(self.positions))

        for coordinate in self.positions:
            packer.pack_float32(coordinate)
        
        for coordinate in self.normals:
            packer.pack_float32(coordinate)

        return packer


class IfcGeometry:
    matrix: Any
    meshes: list[IfcMesh]


    def pack(self) -> BinPacker:
        packer = BinPacker()

        for scalar in self.matrix:
            packer.pack_float32(scalar)
        
        packer.pack_uint32(len(self.meshes))

        for mesh in self.meshes:
            packer.pack_nested(mesh.pack())

        return packer


def collect(file: ifc_file) -> dict[int, IfcGeometry] | None:
    geometries = {}
    
    settings = ifc_geom_settings()
    iterator = ifc_geom_iterator(settings, file, multiprocessing.cpu_count())

    if not iterator.initialize():
        return None

    while True:
        shape = iterator.get()
        materials = shape.geometry.materials
        material_ids = shape.geometry.material_ids
        faces = shape.geometry.faces
        verts = shape.geometry.verts
        meshes: dict[int, IfcMesh] = {}

        for material_id in material_ids:
            material = materials[material_id]
            transparency = material.transparency

            if math.isnan(transparency):
                transparency = 0.0
            
            diffuse = material.diffuse
            r = diffuse.r()
            g = diffuse.g()
            b = diffuse.b()
            a = 1.0 - transparency

            mesh = IfcMesh()
            mesh.color_r = r
            mesh.color_g = g
            mesh.color_b = b
            mesh.color_a = a
            mesh.positions = []
            mesh.normals = []
            meshes[material_id] = mesh

        for face_index in range(0, len(faces) // 3):
            material_id = material_ids[face_index]
            mesh = meshes[material_id]
            positions = mesh.positions
            normals = mesh.normals

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
        
        mesh_list = list(
            mesh for mesh
            in meshes.values()
            if len(mesh.positions) > 0
        )

        if len(mesh_list) > 0:
            geometry = IfcGeometry()
            geometry.matrix = shape.transformation.matrix
            geometry.meshes = mesh_list
            geometries[shape.id] = geometry

        if not iterator.next():
            break
            
    return geometries

