import { Box, Typography } from "@mui/material";
import { useGetPropertySets } from "../../api/queries/psets/useGetPsets";
import { useOutlinerStore } from "../outliner/store";

export const InspectorPropertySets = () => {
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const { data: propertySets } = useGetPropertySets(selectedNodeId);

  if (propertySets === undefined || propertySets === null) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      <Typography component="pre" fontFamily="monospace">
        {JSON.stringify(propertySets, undefined, 2)}
      </Typography>
    </Box>
  );
};
