import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import type { IfcAttribute } from "../../types/ifc";

export const useGetIfcAttributes = (
  fileId: number | null,
  elementId: number | null
) =>
  useQuery({
    enabled: fileId !== null && elementId !== null,
    queryKey: ["ifc", "file", fileId, "element", elementId, "attributes"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/file/${fileId}/element/${elementId}/attributes`
      );
      const json = await response.json();
      return json as IfcAttribute[];
    },
  });
