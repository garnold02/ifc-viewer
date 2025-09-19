import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useCallback, useState, type SyntheticEvent } from "react";
import { InspectorAttributes } from "./InspectorAttributes";
import { InspectorPropertySets } from "./InspectorPropertySets";

type Tab = "attributes" | "property-sets";

export const Inspector = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("attributes");
  const onTabChange = useCallback(
    (_: SyntheticEvent, value: Tab) => setCurrentTab(value),
    [setCurrentTab]
  );

  return (
    <Stack width="100%" height="100%">
      <Tabs value={currentTab} onChange={onTabChange}>
        <Tab label="Attributes" value="attributes" />
        <Tab label="Property Sets" value="property-sets" />
      </Tabs>
      <Box flexGrow={1} padding={1} sx={{ overflowY: "scroll" }}>
        {currentTab === "attributes" ? <InspectorAttributes /> : null}
        {currentTab === "property-sets" ? <InspectorPropertySets /> : null}
      </Box>
    </Stack>
  );
};
