from binpacker import BinPacker
from ifc_geometry import IfcGeometry
from ifcopenshell import entity_instance as ifc_ent, file as ifc_file


class IfcElement:
    id: int
    type: str
    name: str | None
    geometry: IfcGeometry | None
    children: list["IfcElement"]


    def __init__(self, ent: ifc_ent, file: ifc_file, geometries: dict[int, IfcGeometry]):
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
                self.children.append(IfcElement(child, file, geometries))
        
        for rel in file.by_type("IfcRelContainedInSpatialStructure"):
            if rel.RelatingStructure != ent:
                continue
            
            for child in rel.RelatedElements:
                self.children.append(IfcElement(child, file, geometries))
    

    def pack_elements(self) -> BinPacker:
        packer = BinPacker()

        def pack_node(node: IfcElement, parent: IfcElement | None):
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
        geometries: list[IfcGeometry] = []

        def collect(node: IfcElement):
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
    
