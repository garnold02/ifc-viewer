import { useCallback } from "react";
import { IfcCanvas } from "../../../components/IfcCanvas";
import { IfcSceneCamera } from "../../../components/IfcSceneCamera";
import { IfcSceneLight } from "../../../components/IfcSceneLight";
import { Scene } from "./Scene";
import { useOutlinerStore } from "../../../stores/outliner/store";
import { getCameraMoving } from "../../../global/camera";
import { useToolStore } from "../../../stores/tool/store";

export const Viewport = () => {
  const toolContent = useToolStore((state) => state.content);

  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const onClick = useCallback(() => {
    if (getCameraMoving()) {
      return;
    }
    if (toolContent?.type === "select") {
      setSelectedNodeId(null);
    }
  }, [setSelectedNodeId, toolContent?.type]);

  return (
    <IfcCanvas onClickCapture={onClick}>
      <Scene />
      <IfcSceneLight />
      <IfcSceneCamera />
    </IfcCanvas>
  );
};
