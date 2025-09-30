import { Stack } from "@mui/material";
import { ToolButton } from "./ToolButton";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ContentCutIcon from "@mui/icons-material/ContentCut";

export const ToolBar = () => {
  return (
    <Stack direction="row" justifyContent="center" padding={1} gap={1}>
      <ToolButton tool="select" icon={<PanToolAltIcon fontSize="small" />} />
      <ToolButton tool="clip" icon={<ContentCutIcon fontSize="small" />} />
    </Stack>
  );
};
