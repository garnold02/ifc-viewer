import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import { BinaryParser } from "../../utils/BinaryParser";

export const useGetIfcPreview = (id: number | null) =>
  useQuery({
    enabled: id !== null,
    queryKey: ["ifc", "file", id, "preview"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ifc/file/${id}/preview`);
      const arrayBuffer = await response.arrayBuffer();
      const binaryParser = new BinaryParser(arrayBuffer);
      return binaryParser.getArray(binaryParser.getUint32(), () =>
        binaryParser.getIfcGeometry()
      );
    },
  });
