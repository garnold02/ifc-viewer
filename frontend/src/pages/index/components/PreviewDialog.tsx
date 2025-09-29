import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { IfcSummary } from "../../../types/ifc";
import { IfcCanvas } from "../../../components/IfcCanvas";
import { useTranslation } from "react-i18next";
import { useGetIfcPreview } from "../../../api/queries/ifcPreview";
import { IfcSceneLight } from "../../../components/IfcSceneLight";
import { IfcTransformGroup } from "../../../components/IfcTransformGroup";
import { IfcPreviewGeometry } from "../../../components/IfcPreviewGeometry";
import { IfcSceneCamera } from "../../../components/IfcSceneCamera";
import { ButtonLink } from "../../../components/ButtonLink";

type Props = {
  open: boolean;
  summary: IfcSummary;
  onClose: () => void;
};

export const PreviewDialog = ({ open, summary, onClose }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.index.components.PreviewDialog",
  });

  const { data: geometries } = useGetIfcPreview(summary.id);

  return (
    <Dialog open={open} fullScreen>
      <DialogTitle>{summary.name}</DialogTitle>
      <DialogContent>
        <IfcCanvas>
          <IfcTransformGroup>
            {geometries !== undefined
              ? geometries.map((geometry, i) => (
                  <IfcPreviewGeometry key={i} geometry={geometry} />
                ))
              : null}
          </IfcTransformGroup>
          <IfcSceneLight />
          <IfcSceneCamera />
        </IfcCanvas>
      </DialogContent>
      <DialogActions>
        <ButtonLink to="/view/$ifcId" params={{ ifcId: String(summary.id) }}>
          {t("open")}
        </ButtonLink>
        <Button onClick={onClose}>{t("close")}</Button>
      </DialogActions>
    </Dialog>
  );
};
