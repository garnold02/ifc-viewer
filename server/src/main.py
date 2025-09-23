from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import ifc


@asynccontextmanager
async def lifespan(_: FastAPI):
    with open("ifc.txt") as f:
        ifc_path = f.readline().strip()
        ifc.load(ifc_path)
    
    yield


app = FastAPI(lifespan=lifespan)
allowed_origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/tree")
def get_tree():
    return ifc.hierarchy


@app.get("/attributes/{id}")
def get_attributes(id: int):
    try:
        entity = ifc.file.by_id(id)
        info = entity.get_info_2(recursive=True)
        attributes = []

        for key in info:            
            value = info[key]

            if isinstance(value, dict):
                continue
            
            if isinstance(value, tuple):
                continue

            attributes.append({
                "name": key,
                "value": value,
            })
        
        return sorted(
            attributes,
            key=lambda x: x["name"],
        )
    except:
        return None


@app.get("/psets/{id}")
def get_psets(id: int):
    try:
        entity = ifc.file.by_id(id)
        psets = []

        for rel in ifc.file.by_type("IfcRelDefinesByProperties"):
            if entity in rel.RelatedObjects:
                pset = rel.RelatingPropertyDefinition
                psets.append(pset.get_info_2(recursive=True))
        
        return psets

    except:
        return None
