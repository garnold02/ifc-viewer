import { Button, Card, CardActions, CardContent } from "@mui/material";
import type { IfcSummary } from "../../../types/ifc";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "../../../components/ButtonLink";

type Props = {
  summary: IfcSummary;
  onPreviewClick: () => void;
};

export const SummaryCard = ({ summary, onPreviewClick }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.index.components.SummaryCard",
  });

  return (
    <Card>
      <CardContent>{summary.name}</CardContent>
      <CardActions>
        <ButtonLink to="/view/$ifcId" params={{ ifcId: String(summary.id) }}>
          {t("open")}
        </ButtonLink>
        <Button onClick={onPreviewClick}>{t("preview")}</Button>
      </CardActions>
    </Card>
  );
};
