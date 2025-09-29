import { IfcCanvas } from "../../../components/IfcCanvas";
import { IfcSceneCamera } from "../../../components/IfcSceneCamera";
import { IfcSceneLight } from "../../../components/IfcSceneLight";
import { Scene } from "./Scene";

export const Viewport = () => {
  return (
    <IfcCanvas>
      <Scene />
      <IfcSceneLight />
      <IfcSceneCamera />
    </IfcCanvas>
  );
};
