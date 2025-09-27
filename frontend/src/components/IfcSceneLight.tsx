import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3, type DirectionalLight } from "three";

export const IfcSceneLight = () => {
  const lightRef = useRef<DirectionalLight | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current !== null) {
      const cameraDir = new Vector3();
      camera.getWorldDirection(cameraDir);
      lightRef.current.position.copy(cameraDir.negate());
    }
  });

  return (
    <>
      <ambientLight color={[1, 1, 1]} intensity={0.5} />
      <directionalLight ref={lightRef} color={[1, 1, 1]} intensity={0.5} />
    </>
  );
};
