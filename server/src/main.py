from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from ifc_repo import IfcRepo
import os


repo = IfcRepo()


@asynccontextmanager
async def lifespan(_: FastAPI):
    files_path = os.fsencode("files")

    for file_path in os.listdir(files_path):
        file_name = os.fsdecode(file_path)
        if file_name.endswith(".ifc"):
            repo.add_file(file_name)

    yield


app = FastAPI(lifespan=lifespan)
allowed_origins = ["http://localhost:4173", "http://localhost:5173"]

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


@app.get("/api/summaries")
def get_summaries():
    return repo.get_file_summaries()


@app.get("/api/file/{file_id}/summary")
def get_file_summary(file_id: int):
    file = repo.get_file(file_id)

    if file == None:
        raise HTTPException(status_code=404)

    return file.get_summary(file_id)


@app.get("/api/file/{file_id}/elements")
def get_file_elements(file_id: int):
    file = repo.get_file(file_id)

    if file == None:
        raise HTTPException(status_code=404)
    
    content = file.get_elements()
    return Response(content=content, media_type="application/octet-stream")


@app.get("/api/file/{file_id}/preview")
def get_file_preview(file_id: int):
    file = repo.get_file(file_id)

    if file == None:
        raise HTTPException(status_code=404)
    
    content = file.get_preview()
    return Response(content=content, media_type="application/octet-stream")


@app.get("/api/file/{file_id}/element/{element_id}/signature")
def get_file_element_signature(file_id: int, element_id: int):
    file = repo.get_file(file_id)

    if file == None:
        raise HTTPException(status_code=404)
    
    element = file.get_element(element_id)

    if element == None:
        raise HTTPException(status_code=404)
    
    return element.get_signature()


@app.get("/api/file/{file_id}/element/{element_id}/property_tree")
def get_file_element_property_tree(file_id: int, element_id: int):
    file = repo.get_file(file_id)

    if file == None:
        raise HTTPException(status_code=404)
    
    element = file.get_element(element_id)

    if element == None:
        raise HTTPException(status_code=404)
    
    element.set_global_units(file.get_global_units())
    return element.get_property_tree()
