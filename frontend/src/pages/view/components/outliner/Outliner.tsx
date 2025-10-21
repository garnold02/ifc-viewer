import { Box } from "@mui/material";
import { Items } from "@pages/view/components/outliner/Items";
import { Search } from "@pages/view/components/outliner/Search";
import { SearchToggle } from "@pages/view/components/outliner/SearchToggle";
import { Panel } from "@pages/view/components/Panel";
import { PanelBody } from "@pages/view/components/PanelBody";
import { PanelHead } from "@pages/view/components/PanelHead";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Outliner = () => {
  const [searchEnabled, setSearchEnabled] = useState(false);
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.Outliner",
  });

  return (
    <Panel>
      <PanelHead title={t("title")}>
        <Box flexGrow={1} />
        <SearchToggle value={searchEnabled} onChange={setSearchEnabled} />
      </PanelHead>
      <PanelBody>
        {searchEnabled ? <Search /> : null}
        <Items />
      </PanelBody>
    </Panel>
  );
};
