export type IfcHierarchyNode = {
  id: number;
  type: string;
  name: string | null;
  children: IfcHierarchyNode[];
};

export type IfcEntityGeometry = {
  id: number;
  type: string;
  transform: IfcGeometryTransform;
  positions: Float32Array;
  normals: Float32Array;
  colors: Float32Array;
};

export type IfcGeometryTransform = [
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
