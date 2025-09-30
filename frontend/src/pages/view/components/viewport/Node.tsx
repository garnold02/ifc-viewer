import { useCallback, useMemo } from "react";
import { Geometry } from "./Geometry";
import type { ThreeEvent } from "@react-three/fiber";
import type { IfcNode } from "../../../../types/ifc";
import { useOutlinerStore } from "../../../../stores/outliner/store";
import { defaultOutlinerNodeState } from "../../../../utils/outliner";
import { useToolStore } from "../../../../stores/tool/store";
import { getCameraMoving } from "../../../../global/camera";

type Props = {
  node: IfcNode;
  highlight: boolean;
};

export const Node = ({ node, highlight }: Props) => {
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const selected = useMemo(
    () => selectedNodeId === node.id,
    [node.id, selectedNodeId]
  );

  const nodeStates = useOutlinerStore((state) => state.nodeStates);
  const nodeState = useMemo(
    () =>
      nodeStates.find((ns) => ns.id === node.id) ??
      defaultOutlinerNodeState(node.id, node.type),
    [node.id, node.type, nodeStates]
  );

  const toolContent = useToolStore((state) => state.content);

  const onMeshClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (getCameraMoving()) {
        return;
      }
      if (toolContent?.type === "select") {
        setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
      }
    },
    [node.id, selectedNodeId, setSelectedNodeId, toolContent?.type]
  );

  const geometry = useMemo(
    () =>
      node.geometry !== null && nodeState.showSelf ? (
        <Geometry
          geometry={node.geometry}
          highlight={highlight || selected}
          onMeshClick={onMeshClick}
        />
      ) : null,
    [
      highlight,
      node.geometry,
      node.id,
      nodeState.showSelf,
      onMeshClick,
      selected,
    ]
  );

  const children = useMemo(
    () =>
      nodeState.showChildren
        ? node.children.map((child) => (
            <Node
              key={child.id}
              node={child}
              highlight={highlight || selected}
            />
          ))
        : null,
    [highlight, node.children, nodeState.showChildren, selected]
  );

  return (
    <>
      {geometry}
      {children}
    </>
  );
};
