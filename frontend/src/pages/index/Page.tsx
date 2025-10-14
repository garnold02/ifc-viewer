import { Container, Stack } from "@mui/material";
import { useGetSummaries } from "../../api/hooks/summaries";
import { SummaryCard } from "./components/SummaryCard";
import { PreviewDialog } from "./components/PreviewDialog";
import { useState } from "react";
import { AppBar } from "./components/AppBar";
import type { FileSummary } from "../../api/types/file/summary";

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
