import { Stack } from "@mui/material";
import { ToolbarToggleToolButton } from "./ToolbarToggleToolButton";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

export const Toolbar = () => {
  return (
    <Stack direction="row" justifyContent="center">
      <ToolbarToggleToolButton
        tool="select"
        icon={<PanToolAltIcon fontSize="small" />}
      />
      <ToolbarToggleToolButton
        tool="measure_length"
        icon={<SquareFootIcon fontSize="small" />}
      />
      <ToolbarToggleToolButton
        tool="measure_area"
        icon={<CropSquareIcon fontSize="small" />}
      />
      <ToolbarToggleToolButton
        tool="measure_volume"
        icon={<ViewInArIcon fontSize="small" />}
      />
    </Stack>
  );
};
