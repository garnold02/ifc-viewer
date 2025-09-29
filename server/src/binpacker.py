import struct


class BinPacker:
    array: bytearray

    
    def __init__(self):
        self.array = bytearray()
    

    def pack_bool(self, value: bool):
        self.array += struct.pack("<?", value)


    def pack_uint32(self, value: int):
        self.array += struct.pack("<I", value)


    def pack_float32(self, value: float):
        self.array += struct.pack("<f", value)
    

    def pack_string(self, value: str):
        bytes = value.encode()
        self.pack_uint32(len(bytes))
        self.array += bytes
    

    def pack_string_or_none(self, value: str | None):
        if value != None:
            self.pack_string(value)
        else:
            self.pack_uint32(0)
    

    def pack_nested(self, other):
        self.array += other.array
    

    def dump(self, path: str):
        with open(path, "wb") as file:
            file.write(self.array)
