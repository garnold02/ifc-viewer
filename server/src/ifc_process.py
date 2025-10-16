from binpacker import BinPacker
from ifcopenshell import entity_instance as ifc_ent, file as ifc_file
from ifcopenshell.geom import settings as ifc_geom_settings, iterator as ifc_geom_iterator
import math
import multiprocessing
from typing import Any
import numpy as np


class IfcProcessMesh:
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


class IfcProcessGeometry:
    matrix: Any
    meshes: list[IfcProcessMesh]


    def pack(self) -> BinPacker:
        packer = BinPacker()

        for scalar in self.matrix:
            packer.pack_float32(scalar)
        
        packer.pack_uint32(len(self.meshes))

        for mesh in self.meshes:
            packer.pack_nested(mesh.pack())

        return packer


def collect_geometries(file: ifc_file) -> dict[int, IfcProcessGeometry] | None:
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
        meshes: dict[int, IfcProcessMesh] = {}

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

            mesh = IfcProcessMesh()
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
            geometry = IfcProcessGeometry()
            geometry.matrix = shape.transformation.matrix
            geometry.meshes = mesh_list
            geometries[shape.id] = geometry

        if not iterator.next():
            break
            
    return geometries


class IfcProcessElement:
    id: int
    type: str
    name: str | None
    geometry: IfcProcessGeometry | None
    children: list["IfcProcessElement"]


    def __init__(self, ent: ifc_ent, file: ifc_file, geometries: dict[int, IfcProcessGeometry]):
        self.id = ent.id()
        self.type = ent.is_a()
        self.name = ent.Name

        if self.id in geometries:
            self.geometry = geometries[self.id]
        else:
            self.geometry = None
        
        self.children = []

        for rel in file.by_type("IfcRelAggregates"):
            if rel.RelatingObject != ent:
                continue
            
            for child in rel.RelatedObjects:
                self.children.append(IfcProcessElement(child, file, geometries))
        
        for rel in file.by_type("IfcRelContainedInSpatialStructure"):
            if rel.RelatingStructure != ent:
                continue
            
            for child in rel.RelatedElements:
                self.children.append(IfcProcessElement(child, file, geometries))
    

    def pack_elements(self) -> BinPacker:
        packer = BinPacker()

        def pack_node(node: IfcProcessElement, parent: IfcProcessElement | None):
            packer.pack_uint32(node.id)
            packer.pack_string(node.type)
            packer.pack_string_or_none(node.name)
            
            if node.geometry != None:
                packer.pack_bool(True)
                packer.pack_nested(node.geometry.pack())
            else:
                packer.pack_bool(False)
            
            if parent == None:
                packer.pack_bool(False)
            else:
                packer.pack_bool(True)
                packer.pack_uint32(parent.id)
            
            packer.pack_uint32(len(node.children))

            for child in node.children:
                packer.pack_uint32(child.id)
            
            for child in node.children:
                pack_node(child, node)

        pack_node(self, None)
        return packer
    

    def pack_preview(self) -> BinPacker:
        geometries: list[IfcProcessGeometry] = []

        def collect(node: IfcProcessElement):
            if node.geometry != None:
                allow = node.type not in [
                    "IfcFurnishingElement",
                    "IfcFurniture",
                    "IfcOpeningElement",
                    "IfcSpace",
                ]

                if allow:
                    geometries.append(node.geometry)
            
            for child in node.children:
                collect(child)

        collect(self)

        packer = BinPacker()
        packer.pack_uint32(len(geometries))

        for geometry in geometries:
            packer.pack_nested(geometry.pack())

        return packer
