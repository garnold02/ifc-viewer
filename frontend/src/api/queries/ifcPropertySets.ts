import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import type { IfcPropertySet } from "../../types/ifc";

export const useGetIfcPropertySets = (
  ifcId: number | null,
  entityId: number | null
) =>
  useQuery({
    enabled: ifcId !== null && entityId !== null,
    queryKey: ["ifc", "file", ifcId, "element", entityId, "property_sets"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/file/${ifcId}/element/${entityId}/property_sets`
      );
      const json = await response.json();
      return json as IfcPropertySet[];
    },
  });
