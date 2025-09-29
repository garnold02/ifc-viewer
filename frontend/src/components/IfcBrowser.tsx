import { CircularProgress, Stack, Typography } from "@mui/material";
import { useGetIfcList } from "../api/queries/ifcList";

type Props = {
  selected: number | null;
  onSelectionChanged: (value: number | null) => void;
};

export const IfcBrowser = ({ selected, onSelectionChanged }: Props) => {
  const { data: ifcSummaries } = useGetIfcList();

  if (ifcSummaries === undefined) {
    return <CircularProgress />;
  }

  return (
    <Stack>
      {ifcSummaries.map((ifcSummary) => (
        <Typography
          key={ifcSummary.id}
          color={ifcSummary.id === selected ? "primary" : undefined}
          fontWeight={ifcSummary.id === selected ? "bold" : undefined}
          onClick={() =>
            onSelectionChanged(
              ifcSummary.id !== selected ? ifcSummary.id : null
            )
          }
          sx={{ userSelect: "none" }}
          noWrap
        >
          {ifcSummary.name}
        </Typography>
      ))}
    </Stack>
  );
};
