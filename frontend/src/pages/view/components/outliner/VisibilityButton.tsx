import type { Element } from "@api/types/file/element";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Tooltip } from "@mui/material";
import { createDefaultOutlinerNodeState, useIfcStore } from "@stores/ifc/store";
import { produce } from "immer";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  variant: "self" | "children";
  element: Element;
};

export const VisibilityButton = ({ variant, element }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.VisibilityButton",
  });

  const nodeStates = useIfcStore((state) => state.outlinerNodeStates);
  const setNodeState = useIfcStore((state) => state.setOutlinerNodeState);

  const nodeState = useMemo(() => {
    if (element.id in nodeStates) {
      return nodeStates[element.id];
    } else {
      return createDefaultOutlinerNodeState(element);
    }
  }, [element, nodeStates]);

  const value = useMemo(
    () =>
      variant === "self" ? nodeState.selfVisible : nodeState.childrenVisible,
    [variant, nodeState.selfVisible, nodeState.childrenVisible]
  );

  const disabled = useMemo(
    () =>
      variant === "self"
        ? element.geometry === null
        : element.child_ids.length === 0,
    [variant, element.geometry, element.child_ids.length]
  );

  const title = useMemo(
    () =>
      t(
        `${value && !disabled ? "hide" : "show"}_${variant === "self" ? "self" : "children"}`
      ),
    [disabled, t, value, variant]
  );

  const onClick = useCallback(
    () =>
      setNodeState(
        element,
        produce(nodeState, (draft) => {
          switch (variant) {
            case "self":
              draft.selfVisible = !nodeState.selfVisible;
              break;
            case "children":
              draft.childrenVisible = !nodeState.childrenVisible;
              break;
          }
        })
      ),
    [setNodeState, element, nodeState, variant]
  );

  return (
    <Tooltip title={title}>
      <span>
        <IconButton size="small" onClick={onClick} disabled={disabled}>
          {value ? <VisibilityIcon fontSize="small" /> : null}
          {!value ? <VisibilityOffIcon fontSize="small" /> : null}
        </IconButton>
      </span>
    </Tooltip>
  );
};
