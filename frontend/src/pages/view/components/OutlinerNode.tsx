import { Box, Stack } from "@mui/material";
import { OutlinerExpandButton } from "./OutlinerExpandButton";
import { OutlinerVisibilityButton } from "./OutlinerVisibilityButton";
import { useCallback, useMemo } from "react";
import { produce } from "immer";
import { OutlinerNodeTypeLabel } from "./OutlinerNodeTypeLabel";
import { defaultOutlinerNodeState } from "../../../utils/outliner";
import type { IfcNode } from "../../../types/ifc";
import { useOutlinerStore } from "../../../stores/outliner/store";

type Props = {
  node: IfcNode;
};

export const OutlinerNode = ({ node }: Props) => {
  const nodeStates = useOutlinerStore((state) => state.nodeStates);
  const setNodeState = useOutlinerStore((state) => state.setNodeState);

  const nodeState = useMemo(
    () =>
      nodeStates.find((ns) => ns.id === node.id) ??
      defaultOutlinerNodeState(node.id, node.type),
    [node.id, node.type, nodeStates]
  );

  const onExpandClick = useCallback(
    () =>
      setNodeState(node.id, node.type, (prev) =>
        produce(prev, (draft) => {
          draft.expanded = !nodeState.expanded;
        })
      ),
    [node.id, node.type, nodeState.expanded, setNodeState]
  );

  const onSelfVisClick = useCallback(
    () =>
      setNodeState(node.id, node.type, (prev) =>
        produce(prev, (draft) => {
          draft.showSelf = !nodeState.showSelf;
        })
      ),
    [node.id, node.type, nodeState.showSelf, setNodeState]
  );

  const onChildrenVisClick = useCallback(
    () =>
      setNodeState(node.id, node.type, (prev) =>
        produce(prev, (draft) => {
          draft.showChildren = !nodeState.showChildren;
        })
      ),
    [node.id, node.type, nodeState.showChildren, setNodeState]
  );

  const childComponents = useMemo(
    () =>
      node.children.map((child) => (
        <OutlinerNode key={child.id} node={child} />
      )),
    [node.children]
  );

  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center">
        <OutlinerExpandButton
          value={nodeState.expanded}
          onClick={onExpandClick}
          disabled={node.children.length === 0}
        />
        <OutlinerNodeTypeLabel node={node} />
        <Box marginLeft="auto" />
        <OutlinerVisibilityButton
          variant="self"
          value={nodeState.showSelf}
          onClick={onSelfVisClick}
          disabled={node.geometry === null}
        />
        <OutlinerVisibilityButton
          variant="children"
          value={nodeState.showChildren}
          onClick={onChildrenVisClick}
          disabled={node.children.length === 0}
        />
      </Stack>
      {nodeState.expanded ? (
        <Stack direction="column" paddingLeft={1}>
          {childComponents}
        </Stack>
      ) : null}
    </Stack>
  );
};
