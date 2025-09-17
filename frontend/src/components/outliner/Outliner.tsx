import { Box, CircularProgress, Stack } from "@mui/material";
import { useGetHierarchy } from "../../api/queries/useGetHierarchy";
import { OutlinerNode } from "./OutlinerNode";

export const Outliner = () => {
  const { data: rootNode } = useGetHierarchy();

  if (rootNode == undefined) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Box overflow="scroll" padding={1}>
      <OutlinerNode data={rootNode} />
    </Box>
  );
};
