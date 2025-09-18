export type TreeNode = {
  id: number;
  type: string;
  name: string | null;
  geometry: TreeNodeGeometry | null;
  children: TreeNode[];
};

export type TreeNodeGeometry = {
  transform: TreeNodeGeometryTransform;
  positions: number[];
  normals: number[];
  colors: number[];
  transparent: boolean;
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
