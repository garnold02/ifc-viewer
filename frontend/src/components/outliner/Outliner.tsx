import { Box, CircularProgress, Stack, Tab, Tabs } from "@mui/material";
import { OutlinerNode } from "./OutlinerNode";
import { useGetTree } from "../../api/queries/tree/useGetTree";

export const Outliner = () => {
  const { data: rootNode } = useGetTree();

  return (
    <Stack width="100%" height="100%">
      <Tabs value="spatial-structure">
        <Tab label="Spatial Structure" value="spatial-structure" />
      </Tabs>
      <Box flexGrow={1} padding={1} sx={{ overflowY: "scroll" }}>
        {rootNode !== undefined ? (
          <OutlinerNode node={rootNode} />
        ) : (
          <Stack
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Stack>
        )}
      </Box>
    </Stack>
  );
};
