import { useGetFileElementSignature } from "@api/hooks/useGetFileElementSignature";
import { VisibilityToggle } from "@components/VisibilityToggle";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { PanelHead } from "@pages/view/components/PanelHead";
import { useIfcStore } from "@stores/ifc/store";
import { useElementChildrenVisible } from "@stores/ifc/useElementChildrenVisible";
import { useElementSelfVisible } from "@stores/ifc/useElementSelfVisible";
import { useElementSetChildrenVisible } from "@stores/ifc/useElementSetChildrenVisible";
import { useElementSetSelfVisible } from "@stores/ifc/useElementSetSelfVisible";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  elementId: number;
};

export const InspectorHead = ({ elementId }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.InspectorHead",
  });

  const fileId = useIfcStore((state) => state.fileId);
  const elements = useIfcStore((state) => state.elements);

  const { data: signature } = useGetFileElementSignature(fileId, elementId);
  const pushDetailsElement = useIfcStore((state) => state.details.pushElement);

  const element = useMemo(() => elements[elementId], [elementId, elements]);

  const selfVisible = useElementSelfVisible(elementId);
  const setSelfVisible = useElementSetSelfVisible(elementId);

  const childrenVisible = useElementChildrenVisible(elementId);
  const setChildrenVisible = useElementSetChildrenVisible(elementId);

  return (
    <PanelHead title={t("title")}>
      {signature !== undefined ? (
        <>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ userSelect: "none" }}
            noWrap
          >
            {signature.type}#{signature.id}
            {signature.name !== null ? ` - ${signature.name}` : null}
          </Typography>
          <Box flexGrow={1} />
          <Stack direction="row">
            <VisibilityToggle
              value={selfVisible}
              onChange={setSelfVisible}
              disabled={element.geometry === null}
            />
            <VisibilityToggle
              value={childrenVisible}
              onChange={setChildrenVisible}
              disabled={element.child_ids.length === 0}
            />
            <Tooltip title={t("details")}>
              <IconButton
                size="small"
                onClick={() => pushDetailsElement(elementId)}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </>
      ) : (
        <LinearProgress sx={{ flexGrow: 1, marginRight: 1 }} />
      )}
    </PanelHead>
  );
};
