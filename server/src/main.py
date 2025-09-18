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
