import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useMemo, type ReactNode } from "react";
import { useToolStore, type ToolType } from "../../../../stores/tool/store";
import { useTranslation } from "react-i18next";

type Props = {
  type: ToolType;
  icon: ReactNode;
  disabled?: boolean;
};

export const ToolButton = ({ type, icon, disabled }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.toolbar.ToolButton",
  });

  const currentToolType = useToolStore((state) => state.current);
  const setCurrentToolType = useToolStore((state) => state.setCurrent);

  const color = useMemo(
    () => (currentToolType === type ? "primary" : undefined),
    [currentToolType, type]
  );

  const onClick = useCallback(() => {
    setCurrentToolType(currentToolType === type ? null : type);
  }, [currentToolType, setCurrentToolType, type]);

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
