import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { DirectionalLight } from "three";

export const ViewportLight = () => {
  const lightRef = useRef<DirectionalLight | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current !== null) {
      camera.getWorldDirection(lightRef.current.position);
    }
  });

  return (
    <>
      <ambientLight color={[1, 1, 1]} intensity={0.5} />
      <directionalLight ref={lightRef} color={[1, 1, 1]} intensity={0.5} />
    </>
  );
};
