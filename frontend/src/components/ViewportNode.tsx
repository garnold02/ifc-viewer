import { useMemo } from "react";
import { ViewportNodeGeometry } from "./ViewportNodeGeometry";
import { useOutlinerStore } from "../stores/outlinerStore";
import { defaultOutlinerNodeState } from "../utils/outliner";
import type { TreeNode } from "../api/queries/ifcTree";

type Props = {
  node: TreeNode;
  highlight: boolean;
};

export const ViewportNode = ({ node, highlight }: Props) => {
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const selected = useMemo(
    () => selectedNodeId === node.id,
    [node.id, selectedNodeId]
  );

  const geometryComponent = useMemo(
    () =>
      node.geometry !== null ? (
        <ViewportNodeGeometry
          id={node.id}
          geometry={node.geometry}
          highlight={highlight || selected}
        />
      ) : null,
    [highlight, node.geometry, selected]
  );

  const childComponents = useMemo(
    () =>
      node.children.map((child) => (
        <ViewportNode
          key={child.id}
          node={child}
          highlight={highlight || selected}
        />
      )),
    [highlight, node.children, selected]
  );

  const nodeStates = useOutlinerStore((state) => state.nodeStates);
  const nodeState = useMemo(
    () =>
      nodeStates.find((ns) => ns.id === node.id) ??
      defaultOutlinerNodeState(node.id, node.type),
    [node.id, node.type, nodeStates]
  );

  return (
    <>
      {nodeState.showSelf ? geometryComponent : null}
      {nodeState.showChildren ? childComponents : null}
    </>
  );
};
