import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { Items } from "@pages/view/components/outliner/Items";
import { Search } from "@pages/view/components/outliner/Search";
import { SearchToggle } from "@pages/view/components/outliner/SearchToggle";
import { Panel } from "@pages/view/components/Panel";
import { PanelBody } from "@pages/view/components/PanelBody";
import { PanelHead } from "@pages/view/components/PanelHead";
import { useIfcStore } from "@stores/ifc/store";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const Outliner = () => {
  const [searchEnabled, setSearchEnabled] = useState(false);
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.Outliner",
  });

  const selfVisibility = useIfcStore((state) => state.outliner.selfVisibility);
  const childrenVisibility = useIfcStore(
    (state) => state.outliner.childrenVisibility
  );

  const somethingHidden = useMemo(
    () =>
      Object.values(selfVisibility).some((x) => !x) ||
      Object.values(childrenVisibility).some((x) => !x),
    [childrenVisibility, selfVisibility]
  );

  const unhideAll = useIfcStore((state) => state.outliner.unhideAll);

  return (
    <Panel>
      <PanelHead title={t("title")}>
        <Box flexGrow={1} />
        <Stack direction="row">
          {somethingHidden ? (
            <Tooltip title={t("unhide_all")}>
              <IconButton size="small" color="warning" onClick={unhideAll}>
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : null}
          <SearchToggle value={searchEnabled} onChange={setSearchEnabled} />
        </Stack>
      </PanelHead>
      <PanelBody>
        {searchEnabled ? <Search /> : null}
        <Items />
      </PanelBody>
    </Panel>
  );
};
