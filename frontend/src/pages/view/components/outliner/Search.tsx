import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useIfcStore } from "@stores/ifc/store";
import { type ChangeEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";

export const Search = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.Search",
  });

  const filterElementType = useIfcStore((state) => state.filter.elementType);
  const setFilterElementType = useIfcStore(
    (state) => state.filter.setElementType
  );

  const onElementTypeChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFilterElementType(ev.target.value),
    [setFilterElementType]
  );

  const showInViewport = useIfcStore((state) => state.filter.showInViewport);
  const setShowInViewport = useIfcStore(
    (state) => state.filter.setShowInViewport
  );

  const onShowInViewportChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => setShowInViewport(ev.target.checked),
    [setShowInViewport]
  );

  return (
    <>
      <FormGroup>
        <TextField
          variant="standard"
          label={t("element_type")}
          value={filterElementType}
          onChange={onElementTypeChange}
        />
        <FormControlLabel
          label={t("show_in_viewport")}
          control={
            <Checkbox
              size="small"
              checked={showInViewport}
              onChange={onShowInViewportChange}
            />
          }
        />
      </FormGroup>
      <Divider />
    </>
  );
};
