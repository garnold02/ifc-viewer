import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";
import { BinaryParser } from "../../../utils/BinaryParser";

export const useGetFileElements = (fileId: number) =>
  useQuery({
    queryKey: ["api", "file", fileId, "elements"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/file/${fileId}/elements`
      );
      const arrayBuffer = await response.arrayBuffer();
      const binaryParser = new BinaryParser(arrayBuffer);
      return binaryParser.getElements();
    },
  });
