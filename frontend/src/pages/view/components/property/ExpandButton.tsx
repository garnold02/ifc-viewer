import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IconButton } from "@mui/material";
import { usePropertyStore } from "@stores/property/store";
import { useCallback, useMemo } from "react";

type Props = {
  path?: string;
  hidden?: boolean;
};

export const ExpandButton = ({ path, hidden }: Props) => {
  const expansionStates = usePropertyStore((state) => state.expansionStates);
  const setExpanded = usePropertyStore((state) => state.setExpanded);

  const expanded = useMemo(() => {
    if (path === undefined) return false;
    if (path in expansionStates) {
      return expansionStates[path];
    }
    return false;
  }, [expansionStates, path]);

  const onClick = useCallback(() => {
    if (path === undefined) return;
    setExpanded(path, !expanded);
  }, [expanded, path, setExpanded]);

  return (
    <IconButton
      size="small"
      onClick={onClick}
      disabled={path === undefined || hidden}
      sx={{ visibility: path === undefined || hidden ? "hidden" : undefined }}
    >
      {expanded ? <KeyboardArrowDownIcon fontSize="small" /> : null}
      {!expanded ? <KeyboardArrowRightIcon fontSize="small" /> : null}
    </IconButton>
  );
};
