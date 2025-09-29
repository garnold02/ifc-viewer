import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import type { IfcSummary } from "../api/queries/ifcList";
import { useTranslation } from "react-i18next";
import { useGetIfcPreview } from "../api/queries/ifcPreview";
import { IfcItemPreview } from "./IfcItemPreview";
import { useState } from "react";
import { createLink } from "@tanstack/react-router";

type Props = {
  ifcSummary: IfcSummary;
};

export const IfcItem = ({ ifcSummary }: Props) => {
  const { t } = useTranslation();
  const { data: previewGeometries } = useGetIfcPreview(ifcSummary.id);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <Accordion>
      <AccordionSummary>
        <Typography fontWeight="bold">{ifcSummary.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={1}>
          {showPreview ? (
            previewGeometries !== undefined ? (
              <IfcItemPreview geometries={previewGeometries} />
            ) : (
              <CircularProgress />
            )
          ) : (
            <Button
              variant="outlined"
              onClick={() => setShowPreview(true)}
              sx={{ width: "400px", height: "300px" }}
            >
              {t("components.IfcItem.show_preview")}
            </Button>
          )}

          <ButtonLink
            variant="contained"
            to="/view/$ifcId"
            params={{ ifcId: String(ifcSummary.id) }}
          >
            {t("components.IfcItem.open")}
          </ButtonLink>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const ButtonLink = createLink(Button);
