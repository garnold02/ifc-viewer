import { useMemo } from "react";
import { Color } from "three";
import { Mesh } from "./Mesh";
import type { ThreeEvent } from "@react-three/fiber";
import type { IfcGeometry } from "../../../../types/ifc";

type Props = {
  geometry: IfcGeometry;
  highlight: boolean;
  onMeshClick: (event: ThreeEvent<MouseEvent>) => void;
};

export const Geometry = ({ geometry, highlight, onMeshClick }: Props) => {
  const emissive = useMemo<Color>(
    () => (highlight ? new Color(0, 0.125, 0.5) : new Color(0, 0, 0)),
    [highlight]
  );

  return geometry.meshes.map((mesh, i) => (
    <Mesh
      key={i}
      matrix={geometry.matrix}
      mesh={mesh}
      emissive={emissive}
      onClick={onMeshClick}
    />
  ));
};
