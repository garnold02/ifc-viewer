import { useCallback, useMemo } from "react";
import { useOutlinerStore } from "../../../../stores/outliner/store";
import type { IfcNodeFlat } from "../../../../types/ifc";
import { defaultOutlinerNodeState } from "../../../../utils/outliner";
import { produce } from "immer";
import { Box, Stack } from "@mui/material";
import { ExpandButton } from "./ExpandButton";
import { TypeLabel } from "./TypeLabel";
import { NameLabel } from "./NameLabel";
import { VisibilityButton } from "./VisibilityButton";

type Props = {
  elements: Record<number, IfcNodeFlat>;
  element: IfcNodeFlat;
};

export const Element = ({ elements, element }: Props) => {
  const nodeStates = useOutlinerStore((state) => state.nodeStates);
  const setNodeState = useOutlinerStore((state) => state.setNodeState);

  const nodeState = useMemo(
    () =>
      nodeStates.find((ns) => ns.id === element.id) ??
      defaultOutlinerNodeState(element.id, element.type),
    [element.id, element.type, nodeStates]
  );

  const onExpandClick = useCallback(
    () =>
      setNodeState(element.id, element.type, (prev) =>
        produce(prev, (draft) => {
          draft.expanded = !nodeState.expanded;
        })
      ),
    [element.id, element.type, nodeState.expanded, setNodeState]
  );

  const onSelfVisClick = useCallback(
    () =>
      setNodeState(element.id, element.type, (prev) =>
        produce(prev, (draft) => {
          draft.showSelf = !nodeState.showSelf;
        })
      ),
    [element.id, element.type, nodeState.showSelf, setNodeState]
  );

  const onChildrenVisClick = useCallback(
    () =>
      setNodeState(element.id, element.type, (prev) =>
        produce(prev, (draft) => {
          draft.showChildren = !nodeState.showChildren;
        })
      ),
    [element.id, element.type, nodeState.showChildren, setNodeState]
  );

  const childComponents = useMemo(
    () =>
      element.child_ids.map((child_id) => (
        <Element
          key={child_id}
          elements={elements}
          element={elements[child_id]}
        />
      )),
    [element.child_ids, elements]
  );

  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center">
        <ExpandButton
          value={nodeState.expanded}
          onClick={onExpandClick}
          disabled={element.child_ids.length === 0}
        />
        <TypeLabel element={element} />
        <NameLabel element={element} />
        <Box marginLeft="auto" />
        <VisibilityButton
          variant="self"
          value={nodeState.showSelf}
          onClick={onSelfVisClick}
          disabled={element.geometry === null}
        />
        <VisibilityButton
          variant="children"
          value={nodeState.showChildren}
          onClick={onChildrenVisClick}
          disabled={element.child_ids.length === 0}
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
