import type { Element } from "@api/types/file/element";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IconButton } from "@mui/material";
import { createDefaultOutlinerNodeState, useIfcStore } from "@stores/ifc/store";
import { produce } from "immer";
import { useCallback, useMemo } from "react";

type Props = {
  element: Element;
};

export const ExpandButton = ({ element }: Props) => {
  const nodeStates = useIfcStore((state) => state.outlinerNodeStates);
  const setNodeState = useIfcStore((state) => state.setOutlinerNodeState);

  const nodeState = useMemo(() => {
    if (element.id in nodeStates) {
      return nodeStates[element.id];
    } else {
      return createDefaultOutlinerNodeState(element);
    }
  }, [element, nodeStates]);

  const onClick = useCallback(
    () =>
      setNodeState(
        element,
        produce(nodeState, (draft) => {
          draft.expanded = !nodeState.expanded;
        })
      ),
    [setNodeState, element, nodeState]
  );

  const disabled = useMemo(
    () => element.child_ids.length === 0,
    [element.child_ids.length]
  );

  return (
    <IconButton
      size="small"
      onClick={onClick}
      disabled={disabled}
      sx={{ visibility: disabled ? "hidden" : undefined }}
    >
      {nodeState.expanded ? <KeyboardArrowDownIcon fontSize="small" /> : null}
      {!nodeState.expanded ? <KeyboardArrowRightIcon fontSize="small" /> : null}
    </IconButton>
  );
};
