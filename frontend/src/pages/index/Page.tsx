import { useGetSummaries } from "@api/hooks/summaries";
import type { FileSummary } from "@api/types/file/summary";
import { AppBar, Container, Stack } from "@mui/material";
import { PreviewDialog } from "@pages/index/components/PreviewDialog";
import { SummaryCard } from "@pages/index/components/SummaryCard";
import { useState } from "react";

export const Page = () => {
  const { data: summaries } = useGetSummaries();
  const [selected, setSelected] = useState<FileSummary | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (summaries === undefined) {
    return null;
  }

  return (
    <>
      <Stack>
        <AppBar />
        <Container>
          <Stack gap={1} padding={1}>
            {summaries.map((summary) => (
              <SummaryCard
                key={summary.id}
                summary={summary}
                onPreviewClick={() => {
                  setSelected(summary);
                  setPreviewOpen(true);
                }}
              />
            ))}
          </Stack>
        </Container>
      </Stack>
      {selected !== null ? (
        <PreviewDialog
          open={previewOpen}
          summary={selected}
          onClose={() => setPreviewOpen(false)}
        />
      ) : null}
    </>
  );
};
