import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FlyControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { TreeNodeGeometryTransform } from "../../api/queries/tree/types";
import { useGetTree } from "../../api/queries/tree/useGetTree";
import { ViewportNode } from "./ViewportNode";
import { type DirectionalLight } from "three";

export const Viewport = () => {
  // Rotate +90° around X axis
  const matrix = useMemo(
    () =>
      [
        1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      ] as TreeNodeGeometryTransform,
    []
  );

  const { data: rootNode } = useGetTree();

  return (
    <Canvas
      style={{
        background: "linear-gradient(0, rgba(0, 0, 0, 1) 0%, #1b3196 100%)",
      }}
    >
      <group matrix={matrix} matrixAutoUpdate={false}>
        {rootNode !== undefined ? <ViewportNode node={rootNode} /> : null}
        <ambientLight color={[1, 1, 1]} intensity={0.5} />
      </group>
      <CameraDirectionLight />
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

const CameraDirectionLight = () => {
  const lightRef = useRef<DirectionalLight | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current !== null) {
      camera.getWorldDirection(lightRef.current.position);
    }
  });

  return <directionalLight ref={lightRef} color={[1, 1, 1]} intensity={0.5} />;
};
