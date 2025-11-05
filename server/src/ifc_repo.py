from ifc_file import IfcFile, IfcFileSummary
from lookup_table import LookupTable, LookupTableEntry


class IfcRepo:
    _files: list[IfcFile]


    def __init__(self):
        self._files = []
    

    def load_files(self):
        lookup_table = LookupTable()

        for entry in lookup_table.get_entries():
            file = IfcFile(entry.file_name)
            file.process()
            self._files.append(file)
    

    def add_file(self, file_name: str) -> bool:
        lookup_table = LookupTable()

        if lookup_table.get_entry(file_name) != None:
            return False

        file = IfcFile(file_name)
        file.process()
        self._files.append(file)

        entry = LookupTableEntry()
        entry.file_name = file_name
        entry.ifc_schema = file.schema

        lookup_table.append_entry(entry)
        return True
    

    def get_file(self, id: int) -> IfcFile | None:
        if id < 0 or id >= len(self._files):
            return None
        
        return self._files[id]
    

    def get_file_summaries(self) -> list[IfcFileSummary]:
        summaries: list[IfcFileSummary] = []

        for file in self._files:
            summaries.append(file.get_summary())

        return summaries
