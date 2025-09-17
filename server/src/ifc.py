import ifcopenshell


def load(path: str):
    global file
    print(f"Loading IFC from `{path}`...")
    file = ifcopenshell.open(path)
    print("IFC loaded!")
