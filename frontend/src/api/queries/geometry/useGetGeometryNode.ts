import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../constants";
import type { EntityGeometry as GeometryNode } from "./types";

const getGeometryNode = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/geometry/node/${id}`);
  const json = await response.json();
  return json as GeometryNode;
};

export const useGetGeometryNode = (id: number) =>
  useQuery({
    queryKey: ["getGeometryNode", id],
    queryFn: () => getGeometryNode(id),
  });
