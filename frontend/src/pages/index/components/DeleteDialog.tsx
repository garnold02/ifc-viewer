import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  fileName: string;
  onConfirmClick: () => void;
  onCancelClick: () => void;
};

export const DeleteDialog = ({
  open,
  fileName,
  onConfirmClick,
  onCancelClick,
}: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.index.components.DeleteDialog",
  });

  return (
    <Dialog open={open}>
      <DialogTitle>{t("delete_file")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("dialog_text", { name: fileName })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirmClick}>{t("confirm")}</Button>
        <Button onClick={onCancelClick}>{t("cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};
