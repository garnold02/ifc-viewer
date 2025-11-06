import { API_BASE_URL } from "@api/constants";
import type { ElementSignature } from "@api/types/elementSignature";
import { useQuery } from "@tanstack/react-query";

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
