import { API_BASE_URL } from "@api/constants";
import type { Property } from "@api/types/property";
import { useQuery } from "@tanstack/react-query";

export const useGetFileElementPropertyTree = (
  fileId: number,
  elementId: number
) =>
  useQuery({
    queryKey: ["api", "file", fileId, "element", elementId, "property_tree"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/file/${fileId}/element/${elementId}/property_tree`
      );
      const json = await response.json();
      return json as Property;
    },
  });
