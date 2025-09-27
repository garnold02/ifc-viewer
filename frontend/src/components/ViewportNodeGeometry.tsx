import { useCallback, useMemo } from "react";
import { useOutlinerStore } from "../stores/outlinerStore";
import type { ThreeEvent } from "@react-three/fiber";
import { useToolStore } from "../stores/toolStore";
import { produce } from "immer";
import { Vector3 } from "three";
import type { TreeNodeGeometry } from "../api/queries/ifcTree";

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

  const activeTool = useToolStore((state) => state.activeTool);
  const setActiveTool = useToolStore((state) => state.setActiveTool);

  const onMeshClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      switch (activeTool?.type) {
        case "select":
          setSelectedNodeId(selectedNodeId === id ? null : id);
          break;

        case "measure_length":
          setActiveTool((prev) =>
            produce(prev, (draft) => {
              if (draft?.type === "measure_length") {
                draft.points.push(event.point);
              }
            })
          );
          break;

        case "measure_area":
          setActiveTool((prev) =>
            produce(prev, (draft) => {
              if (
                draft?.type === "measure_area" &&
                event.faceIndex !== undefined &&
                event.faceIndex !== null &&
                event.face !== undefined &&
                event.face !== null
              ) {
                const prevFace = draft.faces.find(
                  (f) => f.nodeId === id && f.faceIndex === event.faceIndex
                );

                if (prevFace !== undefined) {
                  draft.faces.splice(draft.faces.indexOf(prevFace), 1);
                  return;
                }

                draft.faces.push({
                  nodeId: id,
                  faceIndex: event.faceIndex,
                  transform: geometry.transform,
                  a: new Vector3(
                    geometry.positions[event.face.a * 3],
                    geometry.positions[event.face.a * 3 + 1],
                    geometry.positions[event.face.a * 3 + 2]
                  ),
                  b: new Vector3(
                    geometry.positions[event.face.b * 3],
                    geometry.positions[event.face.b * 3 + 1],
                    geometry.positions[event.face.b * 3 + 2]
                  ),
                  c: new Vector3(
                    geometry.positions[event.face.c * 3],
                    geometry.positions[event.face.c * 3 + 1],
                    geometry.positions[event.face.c * 3 + 2]
                  ),
                });
              }
            })
          );
          break;
      }
      event.stopPropagation();
    },
    [id, selectedNodeId, setSelectedNodeId, activeTool]
  );

  const mesh = useMemo(
    () => (
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
    ),
    [
      colors,
      emissive,
      geometry.transform,
      geometry.transparent,
      normals,
      onMeshClick,
      positions,
    ]
  );

  return mesh;
};
