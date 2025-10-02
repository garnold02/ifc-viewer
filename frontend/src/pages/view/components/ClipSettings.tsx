import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Panel } from "./Panel";
import { PanelHead } from "./PanelHead";
import { PanelBody } from "./PanelBody";
import { Matrix4 } from "three";
import { useTranslation } from "react-i18next";
import { useIfcStore } from "../../../stores/ifc/store";

export const ClipSettings = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.ClipSettings",
  });

  const alwaysVisible = useIfcStore((state) => state.tool.clip.alwaysVisible);
  const setAlwaysVisible = useIfcStore(
    (state) => state.tool.clip.setAlwaysVisible
  );
  const setMatrix = useIfcStore((state) => state.tool.clip.setMatrix);

  return (
    <Panel>
      <PanelHead title={t("title")} />
      <PanelBody>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={alwaysVisible}
                onChange={(event) => setAlwaysVisible(event.target.checked)}
                sx={{ marginLeft: 0.5 }}
              />
            }
            label={t("always_clip")}
          />
        </FormGroup>
        <Button variant="contained" onClick={() => setMatrix(new Matrix4())}>
          {t("reset_plane")}
        </Button>
      </PanelBody>
    </Panel>
  );
};
