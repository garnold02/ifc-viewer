import { useDeleteFile } from "@api/hooks/useDeleteFile";
import { useGetSummaries } from "@api/hooks/useGetSummaries";
import type { FileSummary } from "@api/types/fileSummary";
import { Container, Stack, Typography } from "@mui/material";
import { AppBar } from "@pages/index/components/AppBar";
import { DeleteDialog } from "@pages/index/components/DeleteDialog";
import { PreviewDialog } from "@pages/index/components/PreviewDialog";
import { SummaryCard } from "@pages/index/components/SummaryCard";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Page = () => {
  const { data: summaries } = useGetSummaries();
  const { mutate: deleteFile } = useDeleteFile();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSelected, setPreviewSelected] = useState<FileSummary | null>(
    null
  );

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState<FileSummary | null>(
    null
  );

  const { t } = useTranslation(undefined, { keyPrefix: "pages.index" });

  if (summaries === undefined) {
    return null;
  }

  return (
    <>
      <Stack>
        <AppBar />
        <Container>
          <Stack gap={1} padding={1}>
            {summaries.length > 0 ? (
              summaries.map((summary) => (
                <SummaryCard
                  key={summary.id}
                  summary={summary}
                  onPreviewClick={() => {
                    setPreviewSelected(summary);
                    setPreviewOpen(true);
                  }}
                  onDeleteClick={() => {
                    setDeleteSelected(summary);
                    setDeleteOpen(true);
                  }}
                />
              ))
            ) : (
              <Typography
                color="textDisabled"
                textAlign="center"
                sx={{ userSelect: "none" }}
              >
                {t("no_files")}
              </Typography>
            )}
          </Stack>
        </Container>
      </Stack>
      {previewSelected !== null ? (
        <PreviewDialog
          open={previewOpen}
          summary={previewSelected}
          onClose={() => setPreviewOpen(false)}
        />
      ) : null}
      {deleteSelected !== null ? (
        <DeleteDialog
          open={deleteOpen}
          fileName={deleteSelected.name}
          onConfirmClick={() =>
            deleteFile(deleteSelected.id, {
              onSuccess: () => setDeleteOpen(false),
            })
          }
          onCancelClick={() => {
            setDeleteOpen(false);
          }}
        />
      ) : null}
    </>
  );
};
