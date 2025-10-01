import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import type { IfcSummary } from "../../types/ifc";

export const useGetIfcSummary = (ifcId: number | null) =>
  useQuery({
    enabled: ifcId !== null,
    queryKey: ["ifc", "file", ifcId, "summary"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ifc/file/${ifcId}/summary`);
      const json = await response.json();
      return json as IfcSummary;
    },
  });
