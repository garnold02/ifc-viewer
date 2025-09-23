from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ifc
from ifcopenshell import entity_instance as ifc_entity


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
    entity = None

    try:
        entity = ifc.file.by_id(id)
    except:
        raise HTTPException(status_code=404)

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


@app.get("/psets/{id}")
def get_psets(id: int):
    entity = None

    try:
        entity = ifc.file.by_id(id)
    except:
        raise HTTPException(status_code=404)

    psets = []

    for rel in ifc.file.by_type("IfcRelDefinesByProperties"):
        if entity in rel.RelatedObjects:
            # TODO: handle the fact that this is actually an `IfcPropertySetDefinitionSelect`
            #       idk how that actually works though, and I can't test it with my files
            pset = rel.RelatingPropertyDefinition
            psets.append(ifc.xform_pset(pset))
    
    # TODO: handle psets attached to the object type instead of the object itself
    
    return psets


# TODO: remove this
@app.get("/allpsets")
def get_allpsets():
    result = []

    for pset in ifc.file.by_type("IfcPropertySetDefinition"):
        result.append(ifc.xform_pset(pset))
    
    return result
