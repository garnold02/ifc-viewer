from os import SEEK_SET


class LookupTableEntry:
    file_name: str
    ifc_schema: str


class LookupTable:
    def get_entries(self) -> list[LookupTableEntry]:
        entries: list[LookupTableEntry] = []

        with open("cache/files.txt", "a+") as file:
            file.seek(0, SEEK_SET)

            for line in file.read().splitlines():
                tokens = line.split()
                entry = LookupTableEntry()
                entry.file_name = tokens[0]
                entry.ifc_schema = tokens[1]
                entries.append(entry)
        
        return entries


    def get_entry(self, file_name: str) -> LookupTableEntry | None:
        for entry in self.get_entries():
            if entry.file_name == file_name:
                return entry
        
        return None


    def get_entry_id(self, file_name: str) -> int | None:
        for (id, entry) in enumerate(self.get_entries()):
            if entry.file_name == file_name:
                return id
        
        return None
    

    def append_entry(self, entry: LookupTableEntry) -> bool:
        if self.get_entry(entry.file_name) != None:
            return False
            
        with open("cache/files.txt", "a+") as file:
            file.write(f"{entry.file_name} {entry.ifc_schema}\n")
        
        return True
