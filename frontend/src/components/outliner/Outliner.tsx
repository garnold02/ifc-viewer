import { CircularProgress, Stack } from "@mui/material";
import { OutlinerNode } from "./OutlinerNode";
import { useGetTree } from "../../api/queries/tree/useGetTree";

export const Outliner = () => {
  const { data: rootNode } = useGetTree();

  if (rootNode == undefined) {
    return (
      <Stack
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  }

  return <OutlinerNode node={rootNode} />;
};
