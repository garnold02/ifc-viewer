from fastapi import FastAPI
import ifc


with open("ifc.txt") as f:
    ifc_path = f.readline().strip()
    ifc.load(ifc_path)


app = FastAPI()


@app.get("/")
def get_root():
    return f"IFC schema is: {ifc.file.schema}"
