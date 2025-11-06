from ifc_file import IfcFile
import ifc_process
import ifcopenshell
import os
import sqlite3
from threading import Lock


class FileSummary:
    id: int
    name: str
    schema: str


class FileRepo:
    _opened_files: dict[int, IfcFile]
    _lock: Lock

    def __init__(self):
        self._opened_files = {}
        self._lock = Lock()

        connection = sqlite3.connect("cache/file_repo.db")
        cursor = connection.cursor()

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS file (
                id INTEGER PRIMARY KEY,
                name TEXT,
                schema TEXT,
                elements BLOB,
                preview BLOB
            );
            """,
        )
    

    def add(self, name: str, content: bytes) -> bool:
        if len(content) > 1073741824:
            return False

        connection = sqlite3.connect("cache/file_repo.db")
        cursor = connection.cursor()
        
        if cursor.execute(
            """
            SELECT id FROM file
                WHERE name = ?;
            """,
            (name,)
        ).fetchone() != None:
            return False
        
        with open(f"cache/{name}", "wb") as file:
            file.write(content)
        
        ifc = ifcopenshell.open(f"cache/{name}")

        print(f"Collecting geometries of `{name}`...")
        geometries = ifc_process.collect_geometries(ifc)

        if geometries != None:
            print("    DONE")
        else:
            print("    ERROR")
            os.remove(f"cache/{name}")
            return False
            
        print(f"Collecting elements of `{name}`...")
        root_element = ifc_process.IfcProcessElement(
            ifc.by_type("IfcProject")[0],
            ifc,
            geometries,
        )
        print(f"    DONE")

        elements = bytes(root_element.pack_elements().array)
        preview = bytes(root_element.pack_preview().array)

        cursor.execute(
            """
            INSERT INTO file (name, schema, elements, preview)
                VALUES (?, ?, ?, ?);
            """,
            (name, ifc.schema, elements, preview),
        )

        connection.commit()
        return True


    def get_summaries(self) -> list[FileSummary]:
        connection = sqlite3.connect("cache/file_repo.db")
        cursor = connection.cursor()

        res = cursor.execute(
            """
            SELECT id, name, schema FROM file;
            """
        )

        summaries: list[FileSummary] = []

        for row in res.fetchall():
            summary = FileSummary()
            summary.id = row[0]
            summary.name = row[1]
            summary.schema = row[2]
            summaries.append(summary)

        return summaries


    def get_summary(self, id: int) -> FileSummary | None:
        connection = sqlite3.connect("cache/file_repo.db")
        cursor = connection.cursor()

        res = cursor.execute(
            """
            SELECT name, schema FROM file
                WHERE id = ?;
            """,
            (id,),
        )

        row = res.fetchone()

        if row == None:
            return None

        summary = FileSummary()
        summary.id = id
        summary.name = row[0]
        summary.schema = row[1]

        return summary


    def get_elements(self, id: int) -> bytes | None:
        connection = sqlite3.connect("cache/file_repo.db")
        cursor = connection.cursor()

        res = cursor.execute(
            """
            SELECT elements FROM file
                WHERE id = ?;
            """,
            (id,),
        )

        row = res.fetchone()

        if row == None:
            return None

        return row[0]


    def get_preview(self, id: int) -> bytes | None:
        connection = sqlite3.connect("cache/file_repo.db")
        cursor = connection.cursor()

        res = cursor.execute(
            """
            SELECT preview FROM file
                WHERE id = ?;
            """,
            (id,),
        )

        row = res.fetchone()

        if row == None:
            return None

        return row[0]


    def open(self, id: int) -> IfcFile | None:
        with self._lock:
            if id in self._opened_files:
                return self._opened_files[id]

            summary = self.get_summary(id)

            if summary == None:
                return None
            
            file = IfcFile(
                ifcopenshell.open(path=f"cache/{summary.name}"),
            )

            self._opened_files[id] = file
            return file
