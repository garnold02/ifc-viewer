from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Response, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from ifc_repo import IfcRepo
import os
from os import SEEK_SET
import ifcopenshell


repo = IfcRepo()


@asynccontextmanager
async def lifespan(_: FastAPI):
    file_names: list[str] = []

    with open("cache/files.txt", "a+") as files:
        files.seek(0, SEEK_SET)
        content = files.read()
        
        for line in content.splitlines():
            tokens = line.split()
            file_names.append(tokens[0])

    for file_path in file_names:
        repo.add_file(file_path)

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


@app.post("/api/file")
async def post_file(file: UploadFile, response: Response):
    if file.size > 1073741824:
        response.status_code = 422
        return { "status": "error" }

    if not file.filename.endswith(".ifc"):
        response.status_code = 422
        return { "status": "error" }

    try:
        with open(f"cache/files.txt", "a+") as files:
            files.seek(0, SEEK_SET)
            content = files.read()

            for line in content.splitlines():
                tokens = line.split()
                if tokens[0] == file.filename:
                    response.status_code = 422
                    return { "status": "error" }
            
            with open(f"cache/{file.filename}", "wb") as out:
                out.write(await file.read())
            
            ifc_file = ifcopenshell.open(f"cache/{file.filename}")
            schema = ifc_file.schema

            files.write(f"{file.filename} {schema}\n")
            repo.add_file(file.filename)
        
        return { "status": "success" }

    except:
        response.status_code = 500
        return { "status": "error" }


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
