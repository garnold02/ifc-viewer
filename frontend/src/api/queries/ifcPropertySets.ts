import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import type { IfcPropertySet } from "../../types/ifc";

export const useGetIfcPropertySets = (
  fileId: number | null,
  elementId: number | null
) =>
  useQuery({
    enabled: fileId !== null && elementId !== null,
    queryKey: ["ifc", "file", fileId, "element", elementId, "property_sets"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/file/${fileId}/element/${elementId}/property_sets`
      );
      const json = await response.json();
      return json as IfcPropertySet[];
    },
  });
