import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import { BinaryParser } from "../../utils/BinaryParser";

export const useGetIfcPreview = (fileId: number | null) =>
  useQuery({
    enabled: fileId !== null,
    queryKey: ["ifc", "file", fileId, "preview"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/file/${fileId}/preview`
      );
      const arrayBuffer = await response.arrayBuffer();
      const binaryParser = new BinaryParser(arrayBuffer);
      return binaryParser.getArray(binaryParser.getUint32(), () =>
        binaryParser.getIfcGeometry()
      );
    },
  });
