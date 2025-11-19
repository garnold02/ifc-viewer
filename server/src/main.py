# Set to `False` to run in production mode
DEVELOPMENT = False


from fastapi import FastAPI, HTTPException, Response, UploadFile
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from file_repo import FileRepo


repo = FileRepo()
app = FastAPI()


if DEVELOPMENT:
    from fastapi.middleware.cors import CORSMiddleware

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
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
    return repo.get_summaries()


@app.post("/api/file")
async def post_file(file: UploadFile, response: Response):
    content = await file.read()

    try:
        if not repo.add(file.filename, content):
            response.status_code = 422
            return { "status": "error" }
    except:
        return { "status": "error" }
    
    return { "status": "success" }


@app.delete("/api/file/{file_id}")
async def delete_file(file_id: int):
    if not repo.delete(file_id):
        raise HTTPException(status_code=404)


@app.get("/api/file/{file_id}/summary")
def get_file_summary(file_id: int):
    summary = repo.get_summary(file_id)

    if summary == None:
        raise HTTPException(status_code=404)
    
    return summary


@app.get("/api/file/{file_id}/elements")
def get_file_elements(file_id: int):
    elements = repo.get_elements(file_id)

    if elements == None:
        raise HTTPException(status_code=404)

    return Response(content=elements, media_type="application/octet-stream")


@app.get("/api/file/{file_id}/preview")
def get_file_preview(file_id: int):
    preview = repo.get_preview(file_id)

    if preview == None:
        raise HTTPException(status_code=404)

    return Response(content=preview, media_type="application/octet-stream")


@app.get("/api/file/{file_id}/element/{element_id}/signature")
def get_file_element_signature(file_id: int, element_id: int):
    file = repo.open(file_id)

    if file == None:
        raise HTTPException(status_code=404)
    
    element = file.get_element(element_id)

    if element == None:
        raise HTTPException(status_code=404)
    
    return element.get_signature()


@app.get("/api/file/{file_id}/element/{element_id}/property_tree")
def get_file_element_property_tree(file_id: int, element_id: int):
    file = repo.open(file_id)

    if file == None:
        raise HTTPException(status_code=404)
    
    element = file.get_element(element_id)

    if element == None:
        raise HTTPException(status_code=404)
    
    element.set_global_units(file.get_global_units())
    return element.get_property_tree()


if not DEVELOPMENT:
    app.mount("/static", StaticFiles(directory="dist"), name="static")

    @app.route("/{_remaining:path}")
    def serve_index_html(_remaining: str):
        return FileResponse(path="dist/index.html")
