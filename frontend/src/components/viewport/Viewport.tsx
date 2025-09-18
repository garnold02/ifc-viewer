import { Canvas } from "@react-three/fiber";
import { FlyControls } from "@react-three/drei";
import { useMemo } from "react";
import type { TreeNodeGeometryTransform } from "../../api/queries/tree/types";
import { useGetTree } from "../../api/queries/tree/useGetTree";
import { ViewportNode } from "./ViewportNode";

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
        <ambientLight color={[1, 1, 1]} intensity={0.25} />
        <directionalLight position={[1, 2, 3]} color={[1, 1, 1]} />
      </group>
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
