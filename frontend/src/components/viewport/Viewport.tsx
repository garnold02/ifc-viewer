import { Canvas } from "@react-three/fiber";
import { useCallback } from "react";
import { useGetTree } from "../../api/queries/tree/useGetTree";
import { useOutlinerStore } from "../outliner/store";
import { useToolbarStore } from "../toolbar/store";
import { ViewportLight } from "./ViewportLight";
import { ViewportScene } from "./ViewportScene";
import { ViewportCamera } from "./ViewportCamera";
import { ViewportToolGeometry } from "./ViewportToolGeometry";

export const Viewport = () => {
  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const toolState = useToolbarStore((state) => state.toolState);

  const onCanvasClick = useCallback(() => {
    if (toolState?.type === "select") {
      setSelectedNodeId(null);
    }
  }, [setSelectedNodeId, toolState?.type]);

  const { data: rootNode } = useGetTree();

  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(0, rgba(0, 0, 0, 1) 0%, #1b3196 100%)",
      }}
      onClickCapture={onCanvasClick}
    >
      <ViewportScene rootNode={rootNode ?? null} />
      <ViewportToolGeometry />
      <ViewportLight />
      <ViewportCamera />
    </Canvas>
  );
};
