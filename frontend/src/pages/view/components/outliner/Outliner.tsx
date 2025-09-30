import { Box, CircularProgress, Stack } from "@mui/material";
import { useIfcContext } from "../../../../contexts/ifc";
import { useGetIfcRootNode } from "../../../../api/queries/ifcRootNode";
import { Node } from "./Node";

export const Outliner = () => {
  const { ifcId } = useIfcContext();
  const { data: rootNode } = useGetIfcRootNode(ifcId);

  return (
    <Box
      padding={1}
      sx={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      {rootNode !== undefined ? (
        <Node node={rootNode} />
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
  );
};
