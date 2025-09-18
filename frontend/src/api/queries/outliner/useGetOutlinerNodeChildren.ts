import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";

const getOutlinerNodeChildren = async (id: number | null) => {
  if (id === null) {
    return null;
  }
  const response = await fetch(`${API_BASE_URL}/outliner/node/${id}/children`);
  const json = await response.json();
  return json as number[];
};

export const useGetOutlinerNodeChildren = (id: number | null) =>
  useQuery({
    queryKey: ["getOutlinerNodeChildren", id],
    queryFn: () => getOutlinerNodeChildren(id),
  });
