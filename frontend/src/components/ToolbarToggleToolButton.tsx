import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  createDefaultActiveTool,
  useToolStore,
  type ToolName,
} from "../stores/toolStore";
import { useCallback, useMemo, type ReactNode } from "react";

type Props = {
  tool: ToolName;
  icon: ReactNode;
};

export const ToolbarToggleToolButton = ({ tool, icon }: Props) => {
  const { t } = useTranslation();
  const activeTool = useToolStore((state) => state.activeTool);
  const setActiveTool = useToolStore((state) => state.setActiveTool);

  const color = useMemo(
    () => (activeTool?.type === tool ? "primary" : "default"),
    [tool, activeTool?.type]
  );

  const onClick = useCallback(
    () =>
      setActiveTool(
        createDefaultActiveTool(activeTool?.type === tool ? null : tool)
      ),
    [setActiveTool, tool, activeTool?.type]
  );

  return (
    <Tooltip title={t(`components.ToolbarToggleToolButton.${tool}`)}>
      <IconButton size="small" color={color} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
