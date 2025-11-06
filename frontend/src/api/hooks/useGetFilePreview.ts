import { API_BASE_URL } from "@api/constants";
import { useQuery } from "@tanstack/react-query";
import { BinaryParser } from "@utils/BinaryParser";

export const useGetFilePreview = (fileId: number) =>
  useQuery({
    queryKey: ["api", "file", fileId, "preview"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/file/${fileId}/preview`
      );
      const arrayBuffer = await response.arrayBuffer();
      const binaryParser = new BinaryParser(arrayBuffer);
      return binaryParser.getArray(binaryParser.getUint32(), () =>
        binaryParser.getElementGeometry()
      );
    },
  });
