from contextlib import asynccontextmanager
from fastapi import FastAPI
import ifc


@asynccontextmanager
async def lifespan(_app: FastAPI):
    with open("ifc.txt") as f:
        ifc_path = f.readline().strip()
        ifc.load(ifc_path)
    
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/hierarchy")
def get_hierarchy():
    return ifc.hierarchy


@app.get("/geometry")
def get_geometry():
    return ifc.geometry
