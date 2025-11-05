from ifc_element import IfcElement
from ifc_process import IfcProcessElement, collect_geometries
import ifcopenshell as ios
import os
from threading import Lock
from lookup_table import LookupTable


class IfcFileSummary:
    id: int
    name: str
    schema: str


class IfcFile:
    name: str
    schema: str | None
    _file: ios.file | None
    _lock: Lock
    _units: list[dict] | None


    def __init__(self, name: str):
        self.name = name
        self.schema = None
        self._file = None
        self._lock = Lock()
        self._units = None
    

    def _load(self):
        if self._file == None:
            self._file = ios.open(f"cache/{self.name}")
            self.schema = self._file.schema
    

    def _unload(self):
        self._file = None
    

    def process(self):
        with self._lock:
            elements_exists = os.path.isfile(f"cache/{self.name}.elements.bin")
            preview_exists = os.path.isfile(f"cache/{self.name}.preview.bin")

            if elements_exists and preview_exists:
                print(f"File `{self.name}` already processed. Skipping...")
                return

            self._load()            
            print(f"Collecting geometries of `{self.name}`...")
            geometries = collect_geometries(self._file)

            if geometries != None:
                print("    DONE")
            else:
                print("    ERROR")
                self._unload()
                return
            
            print(f"Collecting elements of `{self.name}`...")
            root_element = IfcProcessElement(
                self._file.by_type("IfcProject")[0],
                self._file,
                geometries
            )
            print(f"    DONE")

            print(f"Dumping output for `{self.name}`...")
            root_element.pack_elements().dump(f"cache/{self.name}.elements.bin")
            root_element.pack_preview().dump(f"cache/{self.name}.preview.bin")
            print("    DONE")

            self._unload()
    

    def get_summary(self) -> IfcFileSummary:
        lookup_table = LookupTable()
        entry = lookup_table.get_entry(self.name)
        id = lookup_table.get_entry_id(self.name)

        if entry == None or id == None:
            raise Exception()

        summary = IfcFileSummary()
        summary.id = id
        summary.name = self.name
        summary.schema = entry.ifc_schema

        return summary
    

    def get_elements(self) -> bytes:
        with open(f"cache/{self.name}.elements.bin", "rb") as file:
            return file.read()
    

    def get_preview(self) -> bytes:
        with open(f"cache/{self.name}.preview.bin", "rb") as file:
            return file.read()
    

    def get_global_units(self) -> list[dict]:
        if self._units == None:
            with self._lock:
                self._load()
                project = self._file.by_type("IfcProject")[0]
                units: list[ios.entity_instance] = list(project.UnitsInContext.Units)
                transformed_units: list[dict] = []
                
                for unit in units:
                    unit_element = IfcElement(unit)
                    transformed_units.append(unit_element.transform_unit())

                self._units = transformed_units
        
        return self._units


    def get_element(self, element_id: int) -> IfcElement | None:
        with self._lock:
            self._load()
            entity: ios.entity_instance

            try:
                entity = self._file.by_id(element_id)
            except:
                return None

            return IfcElement(entity)
