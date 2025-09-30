import { useCallback } from "react";
import { IfcCanvas } from "../../../../components/IfcCanvas";
import { IfcSceneCamera } from "../../../../components/IfcSceneCamera";
import { IfcSceneLight } from "../../../../components/IfcSceneLight";
import { Scene } from "./Scene";
import { useOutlinerStore } from "../../../../stores/outliner/store";
import { getCameraMoving } from "../../../../global/camera";
import { useToolStore } from "../../../../stores/tool/store";
import { ClipTool } from "./ClipTool";

export const Viewport = () => {
  const currentToolType = useToolStore((state) => state.current);

  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const onClick = useCallback(() => {
    if (getCameraMoving()) {
      return;
    }
    if (currentToolType === "select") {
      setSelectedNodeId(null);
    }
  }, [setSelectedNodeId, currentToolType]);

  return (
    <IfcCanvas onClickCapture={onClick}>
      <Scene />
      <ClipTool />
      <IfcSceneLight />
      <IfcSceneCamera />
    </IfcCanvas>
  );
};
