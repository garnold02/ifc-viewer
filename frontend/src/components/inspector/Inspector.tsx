import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useCallback, useState, type SyntheticEvent } from "react";
import { InspectorAttributes } from "./InspectorAttributes";
import { InspectorPropertySets } from "./InspectorPropertySets";
import { useTranslation } from "react-i18next";

type Tab = "attributes" | "property-sets";

export const Inspector = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("attributes");
  const onTabChange = useCallback(
    (_: SyntheticEvent, value: Tab) => setCurrentTab(value),
    [setCurrentTab]
  );

  const { t } = useTranslation();

  return (
    <Stack width="100%" height="100%">
      <Tabs value={currentTab} onChange={onTabChange}>
        <Tab
          label={t("component.inspector.attributes.title")}
          value="attributes"
        />
        <Tab
          label={t("component.inspector.property_sets.title")}
          value="property-sets"
        />
      </Tabs>
      <Box flexGrow={1} paddingLeft={1} paddingRight={1} overflow="hidden">
        {currentTab === "attributes" ? <InspectorAttributes /> : null}
        {currentTab === "property-sets" ? <InspectorPropertySets /> : null}
      </Box>
    </Stack>
  );
};
