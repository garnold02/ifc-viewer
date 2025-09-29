import { useMemo } from "react";
import type { IfcGeometry } from "../../../types/ifc";
import { Color } from "three";
import { SceneNodeGeometryMesh } from "./SceneNodeGeometryMesh";

type Props = {
  id: number;
  geometry: IfcGeometry;
  highlight: boolean;
};

export const SceneNodeGeometry = ({ id, geometry, highlight }: Props) => {
  const emissive = useMemo<Color>(
    () => (highlight ? new Color(0, 0.125, 0.5) : new Color(0, 0, 0)),
    [highlight]
  );

  return geometry.meshes.map((mesh, i) => (
    <SceneNodeGeometryMesh
      key={i}
      id={id}
      matrix={geometry.matrix}
      mesh={mesh}
      emissive={emissive}
    />
  ));
};
