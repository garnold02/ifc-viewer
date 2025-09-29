import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";
import { parseTreeNode } from "../../utils/parsing";

export type TreeNode = {
  id: number;
  type: string;
  name: string | null;
  geometry: TreeNodeGeometry | null;
  children: TreeNode[];
};

export type TreeNodeGeometry = {
  transform: TreeNodeGeometryTransform;
  meshes: TreeNodeMesh[];
};

export type TreeNodeGeometryTransform = [
  n11: number,
  n12: number,
  n13: number,
  n14: number,
  n21: number,
  n22: number,
  n23: number,
  n24: number,
  n31: number,
  n32: number,
  n33: number,
  n34: number,
  n41: number,
  n42: number,
  n43: number,
  n44: number,
];

export type TreeNodeMesh = {
  color: TreeNodeMeshColor;
  positions: Float32Array;
  normals: Float32Array;
};

export type TreeNodeMeshColor = [r: number, g: number, b: number, a: number];

export const useGetIfcTree = (id: number | null) =>
  useQuery({
    enabled: id !== null,
    queryKey: ["ifc", id, "tree"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ifc/${id}/tree`);
      const arrayBuffer = await response.arrayBuffer();
      const [rootNode] = parseTreeNode(arrayBuffer, 0);
      return rootNode;
    },
  });
