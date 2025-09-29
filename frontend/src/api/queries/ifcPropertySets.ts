import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import type { IfcPropertySet } from "../../types/ifc";

export const useGetIfcPropertySets = (
  ifcId: number | null,
  entityId: number | null
) =>
  useQuery({
    enabled: ifcId !== null && entityId !== null,
    queryKey: ["ifc", ifcId, "psets", entityId],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/${ifcId}/psets/${entityId}`
      );
      const json = await response.json();
      return json as IfcPropertySet[];
    },
  });
