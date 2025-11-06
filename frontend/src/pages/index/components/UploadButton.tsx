import { useUploadFile } from "@api/hooks/useUploadFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
} from "@mui/material";
import { type ChangeEvent, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const UploadButton = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.index.components.UploadButton",
  });

  const { mutate: uploadFile } = useUploadFile();
  const inputRef = useRef<HTMLInputElement>(null);
  const [tooLargeDialogOpen, setTooLargeDialogOpen] = useState(false);
  const [processDialogOpen, setProcessDialogOpen] = useState(false);
  const [processState, setProcessState] = useState<
    "processing" | "success" | "error"
  >("processing");

  const onClick = useCallback(() => {
    if (inputRef.current === null) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files === null || event.target.files.length !== 1) {
        return;
      }

      const file = event.target.files[0];

      if (file.size > 1073741824) {
        setTooLargeDialogOpen(true);
        return;
      }

      setProcessState("processing");
      setProcessDialogOpen(true);

      uploadFile(file, {
        onSuccess: (data) => {
          setProcessState(data.status);
        },
      });
    },
    [uploadFile]
  );

  return (
    <>
      <Button
        variant="text"
        startIcon={<FileUploadIcon fontSize="small" />}
        onClick={onClick}
        sx={{
          paddingTop: 0.25,
          paddingBottom: 0.25,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        {t("text")}
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Dialog open={tooLargeDialogOpen}>
        <DialogTitle>{t("file_too_large")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("file_too_large_detail")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTooLargeDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={processDialogOpen}>
        <DialogTitle>{t("uploading_file")}</DialogTitle>
        <DialogContent>
          {processState === "processing" ? (
            <Stack gap={1}>
              <DialogContentText>
                {t("uploading_file_detail")}
              </DialogContentText>
              <LinearProgress />
            </Stack>
          ) : null}
          {processState === "success" ? (
            <>
              <DialogContentText>
                {t("uploaded_file_success")}
              </DialogContentText>
              <DialogActions>
                <Button
                  onClick={() => {
                    setProcessDialogOpen(false);
                  }}
                >
                  {t("close")}
                </Button>
              </DialogActions>
            </>
          ) : null}
          {processState === "error" ? (
            <>
              <DialogContentText>{t("uploaded_file_error")}</DialogContentText>
              <DialogActions>
                <Button onClick={() => setProcessDialogOpen(false)}>
                  {t("close")}
                </Button>
              </DialogActions>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};
