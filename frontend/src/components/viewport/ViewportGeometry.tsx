import { useMemo } from "react";
import type { EntityGeometry } from "../../api/queries/geometry/types";
import { useOutlinerStore } from "../outliner/store";
import { defaultVisibilityOf } from "../../utils/ifc";

type Props = {
  id: number;
  node: EntityGeometry;
};

export const ViewportGeometry = ({ id, node }: Props) => {
  const visibilityStates = useOutlinerStore((state) => state.visibilityStates);
  const visible = useMemo(
    () =>
      visibilityStates.find((vs) => vs.id === id)?.visible ??
      (node !== undefined ? defaultVisibilityOf(node.type) : false),
    [node, visibilityStates]
  );

  const positions = useMemo(
    () => new Float32Array(node.positions),
    [node.positions]
  );

  const normals = useMemo(() => new Float32Array(node.normals), [node.normals]);
  const colors = useMemo(() => new Float32Array(node.colors), [node.colors]);

  if (!visible) {
    return null;
  }

  return (
    <mesh matrixAutoUpdate={false} matrix={node.transform}>
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
      <meshPhongMaterial vertexColors transparent={node.transparent} />
    </mesh>
  );
};
