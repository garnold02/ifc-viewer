import type { Color, Matrix4 } from "three";
import type { IfcMesh } from "../../../types/ifc";
import { useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";

type Props = {
  matrix: Matrix4;
  mesh: IfcMesh;
  emissive: Color;
  onClick: (event: ThreeEvent<MouseEvent>) => void;
};

export const SceneNodeGeometryMesh = ({
  matrix,
  mesh,
  emissive,
  onClick,
}: Props) => {
  const geometry = useMemo(
    () => (
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={mesh.positions}
          count={mesh.positions.length / 3}
          itemSize={3}
          args={[mesh.positions, 3, false]}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={mesh.normals}
          count={mesh.normals.length / 3}
          itemSize={3}
          args={[mesh.normals, 3, false]}
        />
      </bufferGeometry>
    ),
    [mesh.positions, mesh.normals]
  );

  const material = useMemo(
    () => (
      <meshLambertMaterial
        color={mesh.color}
        opacity={mesh.opacity}
        transparent={mesh.opacity !== 1.0}
        emissive={emissive}
      />
    ),
    [mesh.color, mesh.opacity, emissive]
  );

  return (
    <mesh matrixAutoUpdate={false} matrix={matrix} onClick={onClick}>
      {geometry}
      {material}
    </mesh>
  );
};
