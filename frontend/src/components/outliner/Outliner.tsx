import { Box, CircularProgress, Stack } from "@mui/material";
import { OutlinerNode } from "./OutlinerNode";
import { useGetOutlinerRoot } from "../../api/queries/outliner/useGetOutlinerRoot";

export const Outliner = () => {
  const { data: rootId } = useGetOutlinerRoot();

  if (rootId == undefined) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Box overflow="scroll" padding={1}>
      <OutlinerNode id={rootId} />
    </Box>
  );
};
