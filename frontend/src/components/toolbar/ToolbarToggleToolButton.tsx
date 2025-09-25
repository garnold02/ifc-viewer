import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  createDefaultToolState,
  useToolbarStore,
  type ToolName,
} from "./store";
import { useCallback, useMemo, type ReactNode } from "react";

type Props = {
  tool: ToolName;
  icon: ReactNode;
};

export const ToolbarToggleToolButton = ({ tool, icon }: Props) => {
  const { t } = useTranslation();
  const toolState = useToolbarStore((state) => state.toolState);
  const setToolState = useToolbarStore((state) => state.setToolState);

  const color = useMemo(
    () => (toolState?.type === tool ? "primary" : "default"),
    [tool, toolState?.type]
  );

  const onClick = useCallback(
    () =>
      setToolState(
        createDefaultToolState(toolState?.type === tool ? null : tool)
      ),
    [setToolState, tool, toolState?.type]
  );

  return (
    <Tooltip title={t(`component.toolbar.${tool}`)}>
      <IconButton size="small" color={color} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
