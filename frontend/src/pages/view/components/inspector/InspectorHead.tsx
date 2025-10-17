import { useGetFileElementSignature } from "@api/hooks/file/element/signature";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { PanelHead } from "@pages/view/components/PanelHead";
import { useIfcStore } from "@stores/ifc/store";
import { useTranslation } from "react-i18next";

type Props = {
  elementId: number;
};

export const InspectorHead = ({ elementId }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.InspectorHead",
  });

  const fileId = useIfcStore((state) => state.fileId);
  const { data: signature } = useGetFileElementSignature(fileId, elementId);
  const pushDetailsElement = useIfcStore((state) => state.details.pushElement);

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
          <Tooltip title={t("details")}>
            <IconButton
              size="small"
              onClick={() => pushDetailsElement(elementId)}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <LinearProgress sx={{ flexGrow: 1, marginRight: 1 }} />
      )}
    </PanelHead>
  );
};
