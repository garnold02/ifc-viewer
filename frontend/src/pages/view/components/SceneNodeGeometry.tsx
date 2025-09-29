import { useMemo } from "react";
import type { IfcGeometry } from "../../../types/ifc";
import { Color } from "three";

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
    <mesh key={i} matrixAutoUpdate={false} matrix={geometry.matrix}>
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
      <meshLambertMaterial
        color={mesh.color}
        opacity={mesh.opacity}
        transparent={mesh.opacity !== 1.0}
        emissive={emissive}
      />
    </mesh>
  ));
};
