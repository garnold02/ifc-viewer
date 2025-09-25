import { OrbitControls } from "@react-three/drei";
import { useViewportStore } from "./store";
import { useCallback } from "react";

export const ViewportCamera = () => {
  const setCameraMoving = useViewportStore((state) => state.setCameraMoving);

  const onStart = useCallback(
    () =>
      setTimeout(() => {
        setCameraMoving(true);
      }, 100),
    [setCameraMoving]
  );

  const onEnd = useCallback(
    () =>
      setTimeout(() => {
        setCameraMoving(false);
      }, 100),
    [setCameraMoving]
  );

  return (
    <OrbitControls
      onStart={onStart}
      onEnd={onEnd}
      dampingFactor={0.25}
      makeDefault
    />
  );
};
