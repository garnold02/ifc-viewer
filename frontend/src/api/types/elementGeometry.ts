import type { ElementGeometryMesh } from "@api/types/elementGeometryMesh";
import type { Matrix4 } from "three";

export type ElementGeometry = {
  matrix: Matrix4;
  meshes: ElementGeometryMesh[];
};
