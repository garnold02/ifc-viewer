import { setCameraMoving } from "@global/camera";
import { OrbitControls } from "@react-three/drei";
import { useCallback } from "react";

export const IfcSceneCamera = () => {
  const onStart = useCallback(
    () => setTimeout(() => setCameraMoving(true), 100),
    []
  );

  const onEnd = useCallback(
    () => setTimeout(() => setCameraMoving(false), 100),
    []
  );

  return (
    <OrbitControls
      dampingFactor={0.25}
      onStart={onStart}
      onEnd={onEnd}
      makeDefault
    />
  );
};
