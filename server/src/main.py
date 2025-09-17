from contextlib import asynccontextmanager
from fastapi import FastAPI
import ifc


@asynccontextmanager
async def lifespan(_: FastAPI):
    with open("ifc.txt") as f:
        ifc_path = f.readline().strip()
        ifc.load(ifc_path)
    
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/hierarchy")
def get_hierarchy():
    return ifc.hierarchy


@app.get("/geometries")
def get_geometries():
    return ifc.geometries
