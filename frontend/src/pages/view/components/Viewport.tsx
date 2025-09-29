import { useCallback } from "react";
import { IfcCanvas } from "../../../components/IfcCanvas";
import { IfcSceneCamera } from "../../../components/IfcSceneCamera";
import { IfcSceneLight } from "../../../components/IfcSceneLight";
import { Scene } from "./Scene";
import { useOutlinerStore } from "../../../stores/outliner/store";
import { getCameraMoving } from "../../../global/camera";

export const Viewport = () => {
  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const onClick = useCallback(() => {
    if (getCameraMoving()) {
      return;
    }
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  return (
    <IfcCanvas onClickCapture={onClick}>
      <Scene />
      <IfcSceneLight />
      <IfcSceneCamera />
    </IfcCanvas>
  );
};
