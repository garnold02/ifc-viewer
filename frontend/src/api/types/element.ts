import type { Color, Matrix4 } from "three";

export type Element = {
  id: number;
  type: string;
  name: string | null;
  geometry: ElementGeometry | null;
  parent_id: number | null;
  child_ids: number[];
};

export type ElementGeometry = {
  matrix: Matrix4;
  meshes: ElementGeometryMesh[];
};

export type ElementGeometryMesh = {
  color: Color;
  opacity: number;
  positions: Float32Array;
  normals: Float32Array;
};
