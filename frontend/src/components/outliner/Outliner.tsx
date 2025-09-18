import { Box, CircularProgress, Stack } from "@mui/material";
import { OutlinerNode } from "./OutlinerNode";
import { useGetTree } from "../../api/queries/tree/useGetTree";

export const Outliner = () => {
  const { data: rootNode } = useGetTree();

  if (rootNode == undefined) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Box overflow="scroll" padding={1}>
      <OutlinerNode node={rootNode} />
    </Box>
  );
};
