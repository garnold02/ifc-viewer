import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";
import type { Attributes } from "./types";

const getAttributes = async (id: number | null) => {
  if (id === null) {
    return null;
  }
  const response = await fetch(`${API_BASE_URL}/attributes/${id}`);
  const json = await response.json();
  return json as Attributes;
};

export const useGetAttributes = (id: number | null) =>
  useQuery({
    queryKey: ["getAttributes", id],
    queryFn: () => getAttributes(id),
  });
