import { useMemo } from "react";
import type { TreeNode } from "../../api/queries/tree/types";
import { ViewportNodeGeometry } from "./ViewportNodeGeometry";
import { useOutlinerStore } from "../outliner/store";

type Props = {
  node: TreeNode;
};

export const ViewportNode = ({ node }: Props) => {
  const geometryComponent = useMemo(
    () =>
      node.geometry !== null ? (
        <ViewportNodeGeometry geometry={node.geometry} />
      ) : null,
    [node.geometry]
  );

  const childComponents = useMemo(
    () =>
      node.children.map((child) => (
        <ViewportNode key={child.id} node={child} />
      )),
    [node.children]
  );

  const nodeStates = useOutlinerStore((state) => state.nodeStates);
  const nodeState = useMemo(
    () =>
      nodeStates.find((ns) => ns.id === node.id) ?? {
        id: node.id,
        expanded: false,
        showSelf: true,
        showChildren: true,
      },
    [nodeStates]
  );

  return (
    <>
      {nodeState.showSelf ? geometryComponent : null}
      {nodeState.showChildren ? childComponents : null}
    </>
  );
};
