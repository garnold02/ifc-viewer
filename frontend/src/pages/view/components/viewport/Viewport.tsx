import { IfcCanvas } from "../../../../components/IfcCanvas";
import { ClipTool } from "./ClipTool";
import { IfcSceneLight } from "../../../../components/IfcSceneLight";
import { IfcSceneCamera } from "../../../../components/IfcSceneCamera";
import { Scene } from "./Scene";

export const Viewport = () => {
  return (
    <IfcCanvas>
      <Scene />
      <ClipTool />
      <IfcSceneLight />
      <IfcSceneCamera />
    </IfcCanvas>
  );
};
