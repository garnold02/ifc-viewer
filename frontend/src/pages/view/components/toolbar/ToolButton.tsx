import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useMemo, type ReactNode } from "react";
import {
  createToolContent,
  useToolStore,
  type ToolContent,
} from "../../../../stores/tool/store";
import { useTranslation } from "react-i18next";

type Props = {
  tool: NonNullable<ToolContent>["type"];
  icon: ReactNode;
};

export const ToolButton = ({ tool, icon }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.toolbar.ToolButton",
  });

  const toolContent = useToolStore((state) => state.content);
  const setToolContent = useToolStore((state) => state.setContent);

  const color = useMemo(
    () => (toolContent?.type === tool ? "primary" : undefined),
    [tool, toolContent?.type]
  );

  const onClick = useCallback(() => {
    setToolContent(toolContent?.type === tool ? null : createToolContent(tool));
  }, [setToolContent, toolContent?.type]);

  return (
    <Tooltip title={t(tool)}>
      <IconButton size="small" color={color} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
