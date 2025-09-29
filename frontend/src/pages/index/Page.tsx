import { Container, Stack } from "@mui/material";
import { useGetIfcSummaries } from "../../api/queries/ifcSummaries";
import { SummaryCard } from "./components/SummaryCard";
import { PreviewDialog } from "./components/PreviewDialog";
import { useState } from "react";
import type { IfcSummary } from "../../types/ifc";

export const Page = () => {
  const { data: summaries } = useGetIfcSummaries();
  const [selected, setSelected] = useState<IfcSummary | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (summaries === undefined) {
    return null;
  }

  return (
    <>
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
