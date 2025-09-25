import { useCallback, useMemo } from "react";
import type { TreeNodeGeometry } from "../../api/queries/tree/types";
import { useOutlinerStore } from "../outliner/store";
import type { ThreeEvent } from "@react-three/fiber";
import { useToolbarStore } from "../toolbar/store";
import { produce } from "immer";

type Props = {
  id: number;
  geometry: TreeNodeGeometry;
  highlight: boolean;
};

export const ViewportNodeGeometry = ({ id, geometry, highlight }: Props) => {
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

  const emissive = useMemo<[number, number, number]>(
    () => (highlight ? [0, 0.125, 0.5] : [0, 0, 0]),
    [highlight]
  );

  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const toolState = useToolbarStore((state) => state.toolState);
  const setToolState = useToolbarStore((state) => state.setToolState);

  const onMeshClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      switch (toolState?.type) {
        case undefined:
          break;

        case "select":
          setSelectedNodeId(selectedNodeId === id ? null : id);
          break;

        case "measure_length":
          setToolState((prev) =>
            produce(prev, (draft) => {
              if (draft?.type === "measure_length") {
                draft.points.push(event.point);
              }
            })
          );
          break;
      }

      event.stopPropagation();
    },
    [id, selectedNodeId, setSelectedNodeId, toolState]
  );

  return (
    <mesh
      matrixAutoUpdate={false}
      matrix={geometry.transform}
      onClick={onMeshClick}
    >
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
        emissive={emissive}
      />
    </mesh>
  );
};
