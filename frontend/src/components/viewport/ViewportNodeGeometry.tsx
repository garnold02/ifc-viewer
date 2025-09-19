import { useMemo } from "react";
import type { TreeNodeGeometry } from "../../api/queries/tree/types";

type Props = {
  geometry: TreeNodeGeometry;
  highlight: boolean;
};

export const ViewportNodeGeometry = ({ geometry, highlight }: Props) => {
  const positions = useMemo(
    () => new Float32Array(geometry.positions),
    [geometry.positions]
  );

  const normals = useMemo(
    () => new Float32Array(geometry.normals),
    [geometry.normals]
  );

  const colors = useMemo(
    () => new Float32Array(geometry.colors),
    [geometry.colors]
  );

  const color = useMemo<[number, number, number]>(
    () => (highlight ? [0.5, 1, 4] : [1, 1, 1]),
    [highlight]
  );

  return (
    <mesh matrixAutoUpdate={false} matrix={geometry.transform}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
          args={[positions, 3, false]}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={normals}
          count={normals.length / 3}
          itemSize={3}
          args={[normals, 3, false]}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 4}
          itemSize={4}
          args={[colors, 4, false]}
        />
      </bufferGeometry>
      <meshLambertMaterial
        vertexColors
        transparent={geometry.transparent}
        color={color}
      />
    </mesh>
  );
};
