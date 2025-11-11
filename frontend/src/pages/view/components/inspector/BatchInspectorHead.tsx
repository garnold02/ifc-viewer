import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { PanelHead } from "@pages/view/components/PanelHead";
import { useIfcStore } from "@stores/ifc/store";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  elementIds: number[];
};

export const BatchInspectorHead = ({ elementIds }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.BatchInspectorHead",
  });

  const selfVisibility = useIfcStore((state) => state.outliner.selfVisibility);
  const setSelfVisible = useIfcStore((state) => state.outliner.setSelfVisible);

  const childrenVisibility = useIfcStore(
    (state) => state.outliner.childrenVisibility
  );

  const setChildrenVisible = useIfcStore(
    (state) => state.outliner.setChildrenVisible
  );

  const visBehavior = useMemo(() => {
    for (const elementId of elementIds) {
      if (elementId in selfVisibility && !selfVisibility[elementId]) {
        return "show";
      }
      if (elementId in childrenVisibility && !childrenVisibility[elementId]) {
        return "show";
      }
    }
    return "hide";
  }, [childrenVisibility, elementIds, selfVisibility]);

  const onVisClick = useCallback(() => {
    switch (visBehavior) {
      case "show":
        for (const elementId of elementIds) {
          setSelfVisible(elementId, true);
          setChildrenVisible(elementId, true);
        }
        break;
      case "hide":
        for (const elementId of elementIds) {
          setSelfVisible(elementId, false);
          setChildrenVisible(elementId, false);
        }
        break;
    }
  }, [elementIds, setChildrenVisible, setSelfVisible, visBehavior]);

  return (
    <PanelHead title={t("title")}>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ userSelect: "none" }}
        noWrap
      >
        {t("n_items_selected", { n: elementIds.length })}
      </Typography>
      <Box flexGrow={1} />
      <Tooltip title={t(`${visBehavior}_all`)}>
        <IconButton size="small" onClick={onVisClick}>
          {visBehavior === "show" ? (
            <VisibilityIcon fontSize="small" />
          ) : (
            <VisibilityOffIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </PanelHead>
  );
};
