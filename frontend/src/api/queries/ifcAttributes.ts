import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import type { IfcAttribute } from "../../types/ifc";

export const useGetIfcAttributes = (
  ifcId: number | null,
  entityId: number | null
) =>
  useQuery({
    enabled: ifcId !== null && entityId !== null,
    queryKey: ["ifc", "file", ifcId, "element", entityId, "attributes"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/file/${ifcId}/element/${entityId}/attributes`
      );
      const json = await response.json();
      return json as IfcAttribute[];
    },
  });
