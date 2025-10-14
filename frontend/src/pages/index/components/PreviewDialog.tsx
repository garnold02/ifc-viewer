import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { IfcCanvas } from "../../../components/IfcCanvas";
import { useTranslation } from "react-i18next";
import { useGetFilePreview } from "../../../api/hooks/file/preview";
import { IfcSceneLight } from "../../../components/IfcSceneLight";
import { IfcTransformGroup } from "../../../components/IfcTransformGroup";
import { IfcSceneCamera } from "../../../components/IfcSceneCamera";
import { ButtonLink } from "../../../components/ButtonLink";
import { PreviewGeometry } from "./PreviewGeometry";
import type { FileSummary } from "../../../api/types/file/summary";

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
      <DialogTitle>{summary.name}</DialogTitle>
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
