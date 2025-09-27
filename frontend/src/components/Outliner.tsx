import { Box, CircularProgress, Stack, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useIfcContext } from "../contexts/ifc";
import { useGetIfcTree } from "../api/queries/ifcTree";
import { OutlinerNode } from "./OutlinerNode";

export const Outliner = () => {
  const { ifcId } = useIfcContext();
  const { data: rootNode } = useGetIfcTree(ifcId);
  const { t } = useTranslation();

  return (
    <Stack width="100%" height="100%">
      <Tabs value="spatial_structure">
        <Tab
          label={t("components.Outliner.spatial_structure")}
          value="spatial_structure"
        />
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
