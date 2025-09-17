import { useQuery } from "@tanstack/react-query";
import type { IfcHierarchyNode } from "../../types/ifc";
import { API_BASE_URL } from "../constants";

const getHierarchy = async () => {
  const response = await fetch(`${API_BASE_URL}/hierarchy`);
  const data = (await response.json()) as IfcHierarchyNode;
  return data;
};

export const useGetHierarchy = () =>
  useQuery({
    queryKey: ["getHierarchy"],
    queryFn: getHierarchy,
  });
