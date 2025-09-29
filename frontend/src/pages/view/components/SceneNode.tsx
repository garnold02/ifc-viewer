import { useMemo } from "react";
import type { IfcNode } from "../../../types/ifc";
import { SceneNodeGeometry } from "./SceneNodeGeometry";
import { defaultOutlinerNodeState } from "../../../utils/outliner";
import { useOutlinerStore } from "../../../stores/outliner/store";

type Props = {
  node: IfcNode;
  highlight: boolean;
};

export const SceneNode = ({ node, highlight }: Props) => {
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
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

  const geometry = useMemo(
    () =>
      node.geometry !== null && nodeState.showSelf ? (
        <SceneNodeGeometry
          id={node.id}
          geometry={node.geometry}
          highlight={highlight || selected}
        />
      ) : null,
    [highlight, node.geometry, node.id, nodeState.showSelf, selected]
  );

  const children = useMemo(
    () =>
      nodeState.showChildren
        ? node.children.map((child) => (
            <SceneNode
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
