import { useCallback } from "react";
import { useOutlinerStore } from "../stores/outlinerStore";
import { useToolStore } from "../stores/toolStore";
import { useIfcContext } from "../contexts/ifc";
import { useGetIfcTree } from "../api/queries/ifcTree";
import { IfcCanvas } from "./IfcCanvas";
import { ViewportScene } from "./ViewportScene";
import { ViewportToolGeometry } from "./ViewportToolGeometry";
import { IfcSceneLight } from "./IfcSceneLight";
import { OrbitControls } from "@react-three/drei";

export const Viewport = () => {
  const { ifcId } = useIfcContext();
  const { data: rootNode } = useGetIfcTree(ifcId);
  const activeTool = useToolStore((state) => state.activeTool);

  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const onCanvasClick = useCallback(() => {
    if (activeTool?.type === "select") {
      setSelectedNodeId(null);
    }
  }, [setSelectedNodeId, activeTool?.type]);

  return (
    <IfcCanvas onClickCapture={onCanvasClick}>
      <ViewportScene rootNode={rootNode ?? null} />
      <ViewportToolGeometry />
      <IfcSceneLight />
      <OrbitControls dampingFactor={0.25} makeDefault />
    </IfcCanvas>
  );
};
