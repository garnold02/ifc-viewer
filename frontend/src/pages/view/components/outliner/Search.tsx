import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useIfcStore } from "@stores/ifc/store";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

export const Search = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.Search",
  });

  const filterElementTypes = useIfcStore((state) => state.filter.elementTypes);
  const setFilterElementTypes = useIfcStore(
    (state) => state.filter.setElementTypes
  );

  const [text, setText] = useState("");

  const onElementTypeChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setText(ev.target.value),
    []
  );

  const onElementTypeKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLDivElement>) => {
      if (ev.code === "Enter") {
        if (text.length === 0 || filterElementTypes.includes(text)) {
          return;
        }
        setFilterElementTypes([...filterElementTypes, text]);
        setText("");
      }
    },
    [filterElementTypes, setFilterElementTypes, text]
  );

  const invert = useIfcStore((state) => state.filter.invert);
  const setInvert = useIfcStore((state) => state.filter.setInvert);

  const showInViewport = useIfcStore((state) => state.filter.showInViewport);
  const setShowInViewport = useIfcStore(
    (state) => state.filter.setShowInViewport
  );

  const onAddFilterClick = useCallback(() => {
    setFilterElementTypes([...filterElementTypes, text]);
    setText("");
  }, [filterElementTypes, setFilterElementTypes, text]);

  const addFilterDisabled = useMemo(
    () => text.length === 0 || filterElementTypes.includes(text),
    [filterElementTypes, text]
  );

  const onFilterDelete = useCallback(
    (filter: string) => {
      setFilterElementTypes(
        filterElementTypes.filter((elem) => elem !== filter)
      );
    },
    [filterElementTypes, setFilterElementTypes]
  );

  const onShowInViewportChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => setShowInViewport(ev.target.checked),
    [setShowInViewport]
  );

  const onInvertChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => setInvert(ev.target.checked),
    [setInvert]
  );

  return (
    <>
      <FormControl>
        <FormGroup>
          <TextField
            variant="standard"
            label={t("element_type")}
            value={text}
            onChange={onElementTypeChange}
            onKeyDown={onElementTypeKeyDown}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={onAddFilterClick}
                      disabled={addFilterDisabled}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Stack direction="row" gap={1} marginTop={1}>
            {filterElementTypes.map((filterStr, i) => (
              <Chip
                key={i}
                size="small"
                label={filterStr}
                onDelete={() => onFilterDelete(filterStr)}
              />
            ))}
          </Stack>
          <FormControlLabel
            label={t("invert")}
            control={
              <Checkbox
                size="small"
                checked={invert}
                onChange={onInvertChange}
                disabled={filterElementTypes.length === 0}
              />
            }
          />
          <FormControlLabel
            label={t("show_in_viewport")}
            control={
              <Checkbox
                size="small"
                checked={showInViewport}
                onChange={onShowInViewportChange}
                disabled={filterElementTypes.length === 0}
              />
            }
          />
        </FormGroup>
      </FormControl>
      <Divider />
    </>
  );
};
