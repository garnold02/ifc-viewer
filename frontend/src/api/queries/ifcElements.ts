import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import { BinaryParser } from "../../utils/BinaryParser";

export const useGetIfcElements = (fileId: number | null) =>
  useQuery({
    enabled: fileId !== null,
    queryKey: ["ifc", "file", fileId, "elements"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/file/${fileId}/elements`
      );
      const arrayBuffer = await response.arrayBuffer();
      const binaryParser = new BinaryParser(arrayBuffer);
      return binaryParser.getIfcElements();
    },
  });
