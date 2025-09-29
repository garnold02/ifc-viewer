import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useCallback, useState, type SyntheticEvent } from "react";
import { InspectorAttributes } from "./InspectorAttributes";
import { useTranslation } from "react-i18next";
import { InspectorPropertySets } from "./InspectorPropertySets";

type Tab = "attributes" | "property_sets";

export const Inspector = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("attributes");
  const onTabChange = useCallback(
    (_: SyntheticEvent, value: Tab) => setCurrentTab(value),
    [setCurrentTab]
  );

  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.Inspector",
  });

  return (
    <Stack width="100%" height="100%">
      <Tabs value={currentTab} onChange={onTabChange}>
        <Tab label={t("attributes")} value="attributes" />
        <Tab label={t("property_sets")} value="property_sets" />
      </Tabs>
      <Box flexGrow={1} paddingLeft={1} paddingRight={1} overflow="hidden">
        {currentTab === "attributes" ? <InspectorAttributes /> : null}
        {currentTab === "property_sets" ? <InspectorPropertySets /> : null}
      </Box>
    </Stack>
  );
};
