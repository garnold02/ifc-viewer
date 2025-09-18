import { useQuery } from "@tanstack/react-query";
import type { IfcEntityGeometry } from "../../types/ifc";
import { API_BASE_URL } from "../constants";

type IntermediateGeometry = Omit<
  IfcEntityGeometry,
  "positions" | "normals" | "colors"
> & {
  positions: number[];
  normals: number[];
  colors: number[];
};

const getGeometries = async () => {
  const response = await fetch(`${API_BASE_URL}/geometries`);
  const data = (await response.json()) as IntermediateGeometry[];

  return data.map((geometry) => {
    const result: IfcEntityGeometry = {
      id: geometry.id,
      type: geometry.type,
      transform: geometry.transform,
      positions: new Float32Array(geometry.positions),
      normals: new Float32Array(geometry.normals),
      colors: new Float32Array(geometry.colors),
      transparent: geometry.transparent,
    };

    return result;
  });
};

export const useGetGeometries = () =>
  useQuery({
    queryKey: ["getGeometries"],
    queryFn: getGeometries,
  });
