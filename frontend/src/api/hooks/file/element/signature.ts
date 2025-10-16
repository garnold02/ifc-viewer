import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../../constants";
import type { ElementSignature } from "../../../types/file/element/signature";

export const useGetFileElementSignature = (fileId: number, elementId: number) =>
  useQuery({
    queryKey: ["api", "file", fileId, "element", elementId, "signature"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/file/${fileId}/element/${elementId}/signature`
      );
      const json = await response.json();
      return json as ElementSignature;
    },
  });
