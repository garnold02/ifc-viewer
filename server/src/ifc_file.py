from ifc_element import IfcElement
import ifcopenshell as ios
from threading import Lock


class IfcFile:
    _file: ios.file | None
    _units: list[dict] | None
    _lock: Lock


    def __init__(self, file: ios.file):
        self._file = file
        self._units = None
        self._lock = Lock()
    

    def get_global_units(self) -> list[dict]:
        with self._lock:
            if self._units == None:
                project = self._file.by_type("IfcProject")[0]
                units: list[ios.entity_instance] = list(project.UnitsInContext.Units)
                transformed_units: list[dict] = []
                
                for unit in units:
                    unit_element = IfcElement(unit)
                    transformed_units.append(unit_element.transform_unit())

                self._units = transformed_units
            
            return self._units


    def get_element(self, element_id: int) -> IfcElement | None:
        entity: ios.entity_instance

        try:
            entity = self._file.by_id(element_id)
        except:
            return None

        return IfcElement(entity)
