import { useMemo } from "react";
import type { IfcGeometry } from "../../../types/ifc";
import { Color } from "three";
import { SceneNodeGeometryMesh } from "./SceneNodeGeometryMesh";
import type { ThreeEvent } from "@react-three/fiber";

type Props = {
  geometry: IfcGeometry;
  highlight: boolean;
  onMeshClick: (event: ThreeEvent<MouseEvent>) => void;
};

export const SceneNodeGeometry = ({
  geometry,
  highlight,
  onMeshClick,
}: Props) => {
  const emissive = useMemo<Color>(
    () => (highlight ? new Color(0, 0.125, 0.5) : new Color(0, 0, 0)),
    [highlight]
  );

  return geometry.meshes.map((mesh, i) => (
    <SceneNodeGeometryMesh
      key={i}
      matrix={geometry.matrix}
      mesh={mesh}
      emissive={emissive}
      onClick={onMeshClick}
    />
  ));
};
