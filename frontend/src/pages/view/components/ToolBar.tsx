import { IconButton, Stack } from "@mui/material";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

export const ToolBar = () => {
  return (
    <Stack direction="row" justifyContent="center" padding={1} gap={1}>
      <IconButton size="small">
        <PanToolAltIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};
