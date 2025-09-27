import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

export const useGetIfcPreview = (id: number) =>
  useQuery({
    queryKey: ["ifc", id, "preview"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ifc/${id}/preview`);
      const content = await response.blob();
      return URL.createObjectURL(content);
    },
  });
