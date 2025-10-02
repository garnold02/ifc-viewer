import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useIfcStore, type ToolName } from "../../../../stores/ifc/store";

type Props = {
  type: ToolName;
  icon: ReactNode;
  disabled?: boolean;
};

export const ToolButton = ({ type, icon, disabled }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.toolbar.ToolButton",
  });

  const currentTool = useIfcStore((state) => state.tool.current);
  const setCurrentTool = useIfcStore((state) => state.tool.setCurrent);

  const color = useMemo(
    () => (currentTool === type ? "primary" : undefined),
    [currentTool, type]
  );

  const onClick = useCallback(() => {
    setCurrentTool(currentTool === type ? null : type);
  }, [currentTool, setCurrentTool, type]);

  return (
    <Tooltip title={t(type)}>
      <span>
        <IconButton
          size="small"
          color={color}
          onClick={onClick}
          disabled={disabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};
