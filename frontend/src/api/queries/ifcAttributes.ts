import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import type { IfcAttribute } from "../../types/ifc";

export const useGetIfcAttributes = (
  ifcId: number | null,
  entityId: number | null
) =>
  useQuery({
    enabled: ifcId !== null && entityId !== null,
    queryKey: ["ifc", ifcId, "attributes", entityId],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/${ifcId}/attributes/${entityId}`
      );
      const json = await response.json();
      return json as IfcAttribute[];
    },
  });
