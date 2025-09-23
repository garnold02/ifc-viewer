import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";
import type { PropertySets } from "./types";

const getPropertySets = async (id: number | null) => {
  if (id === null) {
    return null;
  }
  const response = await fetch(`${API_BASE_URL}/psets/${id}`);
  const json = await response.json();
  return json as PropertySets;
};

export const useGetPropertySets = (id: number | null) =>
  useQuery({
    queryKey: ["getPropertySets", id],
    queryFn: () => getPropertySets(id),
  });
