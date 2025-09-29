from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from ifc_file import IfcFile, xform_pset
import os


ifcs = []


def _get_ifc(id: int) -> IfcFile:
    ifc: IfcFile = None

    try:
        ifc = ifcs[id]
    except:
        ifc = None
    
    return ifc


@asynccontextmanager
async def lifespan(_: FastAPI):
    files_path = os.fsencode("files")

    for file_path in os.listdir(files_path):
        file_name = os.fsdecode(file_path)
        if file_name.endswith(".ifc"):
            ifc = IfcFile(file_name)
            ifc.process()
            ifc.unload()
            ifcs.append(ifc)

    yield


app = FastAPI(lifespan=lifespan)
allowed_origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    GZipMiddleware,
    minimum_size=1024,
    compresslevel=5
)


@app.get("/ifc")
def get_ifc_root():
    return [
        {
            "id": i,
            "name": f.file_name,
        }
        for i, f
        in enumerate(ifcs)
    ]


@app.get("/ifc/{id}/preview")
def get_ifc_preview(id: int):
    ifc = _get_ifc(id)
    
    if ifc == None:
        raise HTTPException(status_code=404)
    
    file = None

    try:
        file = open(f"files/{ifc.file_name}.preview.bin", "rb")
    except:
        file = None
    
    if file == None:
        ifc.process()
        file = open(f"files/{ifc.file_name}.preview.bin", "rb")
    
    content = file.read()
    file.close()

    return Response(content=content, media_type="application/octet-stream")


@app.get("/ifc/{id}/tree")
def get_ifc_tree(id: int):
    ifc = _get_ifc(id)
    
    if ifc == None:
        raise HTTPException(status_code=404)

    file = None

    try:
        file = open(f"files/{ifc.file_name}.tree.bin", "rb")
    except:
        file = None
    
    if file == None:
        ifc.process()
        file = open(f"files/{ifc.file_name}.tree.bin", "rb")
    
    content = file.read()
    file.close()

    return Response(content=content, media_type="application/octet-stream")


@app.get("/ifc/{ifc_id}/attributes/{ent_id}")
def get_ifc_attributes(ifc_id: int, ent_id: int):
    ifc = _get_ifc(ifc_id)

    if ifc == None:
        raise HTTPException(status_code=404)

    ifc.load()
    entity = None

    try:
        entity = ifc.file.by_id(ent_id)
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


@app.get("/ifc/{ifc_id}/psets/{ent_id}")
def get_ifc_psets(ifc_id: int, ent_id: int):
    ifc = _get_ifc(ifc_id)
    
    if ifc == None:
        raise HTTPException(status_code=404)

    ifc.load()
    entity = None

    try:
        entity = ifc.file.by_id(ent_id)
    except:
        raise HTTPException(status_code=404)

    psets = []

    for rel in ifc.file.by_type("IfcRelDefinesByProperties"):
        if entity in rel.RelatedObjects:
            # TODO: handle the fact that this is actually an `IfcPropertySetDefinitionSelect`
            #       idk how that actually works though, and I can't test it with my files
            pset = rel.RelatingPropertyDefinition
            psets.append(xform_pset(pset))
    
    # TODO: handle psets attached to the object type instead of the object itself
    
    return psets
