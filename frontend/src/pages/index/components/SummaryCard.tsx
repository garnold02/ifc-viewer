import type { FileSummary } from "@api/types/fileSummary";
import { ButtonLink } from "@components/ButtonLink";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  summary: FileSummary;
  onPreviewClick: () => void;
  onDeleteClick: () => void;
};

export const SummaryCard = ({
  summary,
  onPreviewClick,
  onDeleteClick,
}: Props) => {
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
        <Box flexGrow={1} />
        <Tooltip title={t("delete")}>
          <IconButton size="small" onClick={onDeleteClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
