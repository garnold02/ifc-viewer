import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
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
      <CardContent>
        <Typography>{summary.name}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {summary.schema}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonLink to="/view/$fileId" params={{ fileId: String(summary.id) }}>
          {t("open")}
        </ButtonLink>
        <Button onClick={onPreviewClick}>{t("preview")}</Button>
      </CardActions>
    </Card>
  );
};
