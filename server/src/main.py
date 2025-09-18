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


@app.get("/outliner/root")
def get_outliner_root():
    project_entity = ifc.file.by_type("IfcProject")[0]
    return project_entity.id()


@app.get("/outliner/node/{id}/info")
def get_outliner_node_info(id: int):
    try:
        entity = ifc.file.by_id(id)
        children = get_outliner_node_children(id)
        
        return {
            "type": entity.is_a(),
            "name": entity.Name,
            "has_children": children != None and len(children) > 0,
        }
    except:
        return None


@app.get("/outliner/node/{id}/children")
def get_outliner_node_children(id: int):
    try:
        entity = ifc.file.by_id(id)
        children = []

        for rel in ifc.file.by_type("IfcRelAggregates"):
            if rel.RelatingObject != entity:
                continue
            
            for child in rel.RelatedObjects:
                children.append(child.id())
        
        for rel in ifc.file.by_type("IfcRelContainedInSpatialStructure"):
            if rel.RelatingStructure != entity:
                continue
            
            for child in rel.RelatedElements:
                children.append(child.id())
        
        return children
    except:
        return None


@app.get("/geometry/list")
def get_geometry_list():
    return list(ifc.geometry.keys())


@app.get("/geometry/node/{id}")
def get_geometry_node(id: int):
    if id in ifc.geometry:
        return ifc.geometry[id]
    else:
        return None


@app.get("/tree")
def get_tree():
    return ifc.hierarchy
