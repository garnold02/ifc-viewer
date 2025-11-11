import { IfcCanvas } from "@components/IfcCanvas";
import { IfcSceneCamera } from "@components/IfcSceneCamera";
import { IfcSceneGrid } from "@components/IfcSceneGrid";
import { IfcSceneLight } from "@components/IfcSceneLight";
import { ClipTool } from "@pages/view/components/viewport/ClipTool";
import { MeasureDistanceTool } from "@pages/view/components/viewport/MeasureDistanceTool";
import { Scene } from "@pages/view/components/viewport/Scene";

export const Viewport = () => {
  return (
    <IfcCanvas>
      <IfcSceneGrid />
      <IfcSceneLight />
      <IfcSceneCamera />
      <Scene />
      <ClipTool />
      <MeasureDistanceTool />
    </IfcCanvas>
  );
};
