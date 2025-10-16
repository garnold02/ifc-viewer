import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../../constants";
import type { Property } from "../../../types/file/element/property";

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
