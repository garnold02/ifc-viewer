import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

export type IfcSummary = {
  id: number;
  name: string;
};

export const useGetIfcList = () =>
  useQuery({
    queryKey: ["ifc"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ifc`);
      const content = await response.json();
      return content as IfcSummary[];
    },
  });
