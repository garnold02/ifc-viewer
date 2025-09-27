import { CircularProgress, Stack } from "@mui/material";
import { useGetIfcList } from "../api/queries/ifcList";
import { IfcItem } from "../components/IfcItem";

export const IfcList = () => {
  const { data: ifcList } = useGetIfcList();
  return (
    <Stack direction="row" justifyContent="center">
      <Stack gap={1}>
        {ifcList !== undefined ? (
          ifcList.map((ifcSummary) => (
            <IfcItem key={ifcSummary.id} ifcSummary={ifcSummary} />
          ))
        ) : (
          <CircularProgress />
        )}
      </Stack>
    </Stack>
  );
};
