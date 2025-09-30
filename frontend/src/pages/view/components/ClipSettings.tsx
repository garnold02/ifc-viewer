import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Panel } from "./Panel";
import { PanelHead } from "./PanelHead";
import { PanelBody } from "./PanelBody";
import { useToolStore } from "../../../stores/tool/store";
import { Matrix4 } from "three";
import { useTranslation } from "react-i18next";

export const ClipSettings = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.ClipSettings",
  });

  const clipVisible = useToolStore((state) => state.clipState.visible);
  const setClipVisible = useToolStore((state) => state.setClipVisible);
  const setClipMatrix = useToolStore((state) => state.setClipMatrix);

  return (
    <Panel>
      <PanelHead title={t("title")} />
      <PanelBody>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={clipVisible}
                onChange={(event) => setClipVisible(event.target.checked)}
                sx={{ marginLeft: 0.5 }}
              />
            }
            label={t("always_clip")}
          />
        </FormGroup>
        <Button
          variant="contained"
          onClick={() => setClipMatrix(new Matrix4())}
        >
          {t("reset_plane")}
        </Button>
      </PanelBody>
    </Panel>
  );
};
