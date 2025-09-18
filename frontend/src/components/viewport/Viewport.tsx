import { Canvas } from "@react-three/fiber";
import { FlyControls } from "@react-three/drei";
import { useGetGeometries } from "../../api/queries/useGetGeometries";
import type { IfcEntityGeometry, IfcGeometryTransform } from "../../types/ifc";
import { useMemo } from "react";
import { defaultVisibilityOf } from "../../utils/ifc";
import { useOutlinerStore } from "../outliner/store";

export const Viewport = () => {
  const { data: geometries } = useGetGeometries();

  return (
    <Canvas
      style={{
        background:
          "linear-gradient(0, rgba(0, 0, 0, 1) 0%, rgba(71, 163, 255, 1) 100%)",
      }}
    >
      {geometries !== undefined ? <Scene geometries={geometries} /> : null}
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
  geometries: IfcEntityGeometry[];
};

const Scene = ({ geometries }: SceneProps) => {
  const matrix = useMemo(
    () =>
      [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1] as IfcGeometryTransform,
    []
  );

  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      {geometries.map((geometry) => (
        <Geometry key={geometry.id} geometry={geometry} />
      ))}
    </group>
  );
};

type GeometryProps = { geometry: IfcEntityGeometry };

const Geometry = ({ geometry }: GeometryProps) => {
  const defaultVisibility = useMemo(
    () => defaultVisibilityOf(geometry.type),
    [geometry.type]
  );

  const visibilityStates = useOutlinerStore((state) => state.visibilityStates);

  const isVisible = useMemo(
    () =>
      visibilityStates.find((vs) => vs.id === geometry.id)?.visible ??
      defaultVisibility,
    [defaultVisibility, geometry.id, visibilityStates]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <mesh matrixAutoUpdate={false} matrix={geometry.transform}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={geometry.positions}
          count={geometry.positions.length / 3}
          itemSize={3}
          args={[geometry.positions, 3, false]}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={geometry.normals}
          count={geometry.normals.length / 3}
          itemSize={3}
          args={[geometry.normals, 3, false]}
        />
        <bufferAttribute
          attach="attributes-color"
          array={geometry.colors}
          count={geometry.colors.length / 4}
          itemSize={4}
          args={[geometry.colors, 4, false]}
        />
      </bufferGeometry>
      <meshPhongMaterial vertexColors transparent={geometry.transparent} />
    </mesh>
  );
};
