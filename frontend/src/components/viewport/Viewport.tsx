import { Canvas } from "@react-three/fiber";
import { FlyControls } from "@react-three/drei";
import { useMemo } from "react";
import { defaultVisibilityOf } from "../../utils/ifc";
import { useOutlinerStore } from "../outliner/store";
import { useGetGeometryList } from "../../api/queries/geometry/useGetGeometryList";
import type { EntityTransform } from "../../api/queries/geometry/types";
import { useGetGeometryNode } from "../../api/queries/geometry/useGetGeometryNode";
import { useGetOutlinerNodeInfo } from "../../api/queries/outliner/useGetOutlinerNodeInfo";

export const Viewport = () => {
  const { data: geometryIds } = useGetGeometryList();

  return (
    <Canvas
      style={{
        background:
          "linear-gradient(0, rgba(0, 0, 0, 1) 0%, rgba(71, 163, 255, 1) 100%)",
      }}
    >
      {geometryIds !== undefined ? <Scene ids={geometryIds} /> : null}
      <ambientLight color={[1, 1, 1]} intensity={0.25} />
      <directionalLight position={[1, 2, 3]} color={[1, 1, 1]} />
      <FlyControls
        autoForward={false}
        dragToLook={true}
        movementSpeed={3}
        rollSpeed={1}
        makeDefault
      />
    </Canvas>
  );
};

type SceneProps = {
  ids: number[];
};

const Scene = ({ ids }: SceneProps) => {
  const matrix = useMemo(
    () => [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1] as EntityTransform,
    []
  );

  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      {ids.map((id) => (
        <Geometry key={id} id={id} />
      ))}
    </group>
  );
};

type GeometryProps = { id: number };

const Geometry = ({ id }: GeometryProps) => {
  const { data: geometry } = useGetGeometryNode(id);
  const { data: info } = useGetOutlinerNodeInfo(id);

  const defaultVisibility = useMemo(
    () => (info !== undefined ? defaultVisibilityOf(info.type) : false),
    [info]
  );

  const visibilityStates = useOutlinerStore((state) => state.visibilityStates);

  const isVisible = useMemo(
    () =>
      visibilityStates.find((vs) => vs.id === id)?.visible ?? defaultVisibility,
    [defaultVisibility, id, visibilityStates]
  );

  const positions = useMemo(
    () =>
      geometry !== undefined ? new Float32Array(geometry.positions) : null,
    [geometry]
  );

  const normals = useMemo(
    () => (geometry !== undefined ? new Float32Array(geometry.normals) : null),
    [geometry]
  );

  const colors = useMemo(
    () => (geometry !== undefined ? new Float32Array(geometry.colors) : null),
    [geometry]
  );

  if (!isVisible) {
    return null;
  }

  if (
    geometry?.transform === undefined ||
    positions === null ||
    normals === null ||
    colors === null
  ) {
    return null;
  }

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
      <meshPhongMaterial vertexColors transparent={geometry.transparent} />
    </mesh>
  );
};
