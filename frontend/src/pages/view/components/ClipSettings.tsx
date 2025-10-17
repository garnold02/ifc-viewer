import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Panel } from "@pages/view/components/Panel";
import { PanelBody } from "@pages/view/components/PanelBody";
import { PanelHead } from "@pages/view/components/PanelHead";
import { useIfcStore } from "@stores/ifc/store";
import { useTranslation } from "react-i18next";
import { Matrix4 } from "three";

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
