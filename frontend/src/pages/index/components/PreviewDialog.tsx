import { useGetFilePreview } from "@api/hooks/file/preview";
import type { FileSummary } from "@api/types/file/summary";
import { ButtonLink } from "@components/ButtonLink";
import { IfcCanvas } from "@components/IfcCanvas";
import { IfcSceneCamera } from "@components/IfcSceneCamera";
import { IfcSceneLight } from "@components/IfcSceneLight";
import { IfcTransformGroup } from "@components/IfcTransformGroup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { PreviewGeometry } from "./PreviewGeometry";

type Props = {
  open: boolean;
  summary: FileSummary;
  onClose: () => void;
};

export const PreviewDialog = ({ open, summary, onClose }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.index.components.PreviewDialog",
  });

  const { data: geometries } = useGetFilePreview(summary.id);

  return (
    <Dialog open={open} fullScreen>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          {summary.name}
          <Box flexGrow={1} />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <IfcCanvas>
          <IfcTransformGroup>
            {geometries !== undefined
              ? geometries.map((geometry, i) => (
                  <PreviewGeometry key={i} geometry={geometry} />
                ))
              : null}
          </IfcTransformGroup>
          <IfcSceneLight />
          <IfcSceneCamera />
        </IfcCanvas>
      </DialogContent>
      <DialogActions>
        <ButtonLink to="/view/$fileId" params={{ fileId: String(summary.id) }}>
          {t("open")}
        </ButtonLink>
        <Button onClick={onClose}>{t("close")}</Button>
      </DialogActions>
    </Dialog>
  );
};
