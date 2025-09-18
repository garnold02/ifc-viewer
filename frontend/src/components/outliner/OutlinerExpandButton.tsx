import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

type Props = {
  state: "collapsed" | "loading" | "expanded";
  onClick: () => void;
  disabled: boolean;
};

export const OutlinerExpandButton = ({ state, onClick, disabled }: Props) => {
  return (
    <IconButton
      size="small"
      onClick={onClick}
      disabled={disabled || state === "loading"}
    >
      {state === "collapsed" ? (
        <KeyboardArrowRightIcon fontSize="small" />
      ) : null}
      {state === "loading" ? <HourglassEmptyIcon fontSize="small" /> : null}
      {state === "expanded" ? <KeyboardArrowDownIcon fontSize="small" /> : null}
    </IconButton>
  );
};
