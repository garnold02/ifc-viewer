from binpacker import BinPacker
from ifc_geometry import IfcGeometry
from ifcopenshell import entity_instance as ifc_ent, file as ifc_file


class IfcNode:
    id: int
    type: str
    name: str | None
    geometry: IfcGeometry | None
    children: list["IfcNode"]


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
                self.children.append(IfcNode(child, file, geometries))
        
        for rel in file.by_type("IfcRelContainedInSpatialStructure"):
            if rel.RelatingStructure != ent:
                continue
            
            for child in rel.RelatedElements:
                self.children.append(IfcNode(child, file, geometries))
    

    def pack(self) -> BinPacker:
        packer = BinPacker()
        packer.pack_uint32(self.id)
        packer.pack_string(self.type)
        packer.pack_string_or_none(self.name)
        
        if self.geometry != None:
            packer.pack_bool(True)
            packer.pack_nested(self.geometry.pack())
        else:
            packer.pack_bool(False)
        
        packer.pack_uint32(len(self.children))
        
        for child in self.children:
            packer.pack_nested(child.pack())

        return packer
    

    def pack_preview(self) -> BinPacker:
        geometries: list[IfcGeometry] = []

        def collect(node: IfcNode):
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
    
