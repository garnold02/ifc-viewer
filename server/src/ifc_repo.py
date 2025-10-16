from ifc_file import IfcFile, IfcFileSummary


class IfcRepo:
    _files: list[IfcFile]


    def __init__(self):
        self._files = []
    

    def add_file(self, name: str):
        file = IfcFile(name)
        file.process()
        self._files.append(file)
    

    def get_file(self, id: int) -> IfcFile | None:
        if id < 0 or id >= len(self._files):
            return None
        
        return self._files[id]
    

    def get_file_summaries(self) -> list[IfcFileSummary]:
        summaries: list[IfcFileSummary] = []

        for id, file in enumerate(self._files):
            summaries.append(file.get_summary(id))

        return summaries
