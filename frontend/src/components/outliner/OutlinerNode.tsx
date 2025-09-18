import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { OutlinerExpandButton } from "./OutlinerExpandButton";
import { OutlinerVisibilityButton } from "./OutlinerVisibilityButton";
import type { TreeNode } from "../../api/queries/tree/types";
import { useOutlinerStore } from "./store";
import { useCallback, useMemo } from "react";
import { produce } from "immer";

type Props = {
  node: TreeNode;
};

export const OutlinerNode = ({ node }: Props) => {
  const nodeStates = useOutlinerStore((state) => state.nodeStates);
  const setNodeState = useOutlinerStore((state) => state.setNodeState);

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

  const onExpandClick = useCallback(
    () =>
      setNodeState(node.id, (prev) =>
        produce(prev, (draft) => {
          draft.expanded = !nodeState.expanded;
        })
      ),
    [nodeState.expanded, setNodeState]
  );

  const onSelfVisClick = useCallback(
    () =>
      setNodeState(node.id, (prev) =>
        produce(prev, (draft) => {
          draft.showSelf = !nodeState.showSelf;
        })
      ),
    [nodeState.showSelf, setNodeState]
  );

  const onChildrenVisClick = useCallback(
    () =>
      setNodeState(node.id, (prev) =>
        produce(prev, (draft) => {
          draft.showChildren = !nodeState.showChildren;
        })
      ),
    [nodeState.showChildren, setNodeState]
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
        {node.name !== null && node.name.length > 0 ? (
          <Tooltip title={node.name}>
            <Typography>{node.type}</Typography>
          </Tooltip>
        ) : (
          <Typography>{node.type}</Typography>
        )}
        <Box marginLeft="auto" />
        <OutlinerVisibilityButton
          value={nodeState.showSelf}
          onClick={onSelfVisClick}
          disabled={false}
        />
        <OutlinerVisibilityButton
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
