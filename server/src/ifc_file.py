import ifc_geometry
from ifc_node import IfcNode
from ifcopenshell import entity_instance as ifc_ent, file as ifc_file, open as ifc_open
import os.path
from threading import Lock


class IfcFile:
    file_name: str = None
    file: ifc_file = None
    schema: str = None
    lock: Lock = Lock()


    def __init__(self, file_name: str):
        self.file_name = file_name
    

    def load(self):
        with self.lock:
            if self.file != None:
                return

            print(f"Loading `{self.file_name}`...")
            self.file = ifc_open(f"files/{self.file_name}")
            self.schema = self.file.schema
            print("    DONE")
    

    def unload(self):
        with self.lock:
            if self.file == None:
                return
            
            print(f"Unloading `{self.file_name}`...")
            self.file = None
            print("    DONE")
    

    def process(self):
        self.load()

        tree_exists = os.path.isfile(f"files/{self.file_name}.tree.bin")
        preview_exists = os.path.isfile(f"files/{self.file_name}.preview.bin")
        
        if tree_exists and preview_exists:
            self.unload()
            return
        

        with self.lock:
            print(f"Collecting geometries of `{self.file_name}`...")
            geometries = ifc_geometry.collect(self.file)

            if geometries != None:
                print("    DONE")
            else:
                print("    ERROR")
                return

            print(f"Collecting nodes of `{self.file_name}`...")
            root_node = IfcNode(self.file.by_type("IfcProject")[0], self.file, geometries)
            print(f"    DONE")

            print(f"Dumping output for `{self.file_name}`...")
            root_node.pack().dump(f"files/{self.file_name}.tree.bin")
            root_node.pack_preview().dump(f"files/{self.file_name}.preview.bin")
            print("    DONE")


def _xform_pset_prop(prop: ifc_ent) -> dict:
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


def _xform_pset_quan(quan: ifc_ent) -> dict:
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


def xform_pset(pset: ifc_ent) -> dict:
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
