import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import type { IfcSummary } from "../../types/ifc";

export const useGetIfcSummary = (fileId: number | null) =>
  useQuery({
    enabled: fileId !== null,
    queryKey: ["ifc", "file", fileId, "summary"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/file/${fileId}/summary`
      );
      const json = await response.json();
      return json as IfcSummary;
    },
  });
