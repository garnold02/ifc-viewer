import type { Color } from "three";

export type ElementGeometryMesh = {
  color: Color;
  opacity: number;
  positions: Float32Array;
  normals: Float32Array;
};
