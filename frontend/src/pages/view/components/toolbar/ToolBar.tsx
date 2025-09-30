import { Stack } from "@mui/material";
import { ToolButton } from "./ToolButton";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { useToolStore } from "../../../../stores/tool/store";

export const ToolBar = () => {
  const clipVisible = useToolStore((state) => state.clipState.visible);
  return (
    <Stack direction="row" justifyContent="center" padding={1} gap={1}>
      <ToolButton
        type="select"
        icon={<PanToolAltIcon fontSize="small" />}
        disabled={clipVisible}
      />
      <ToolButton type="clip" icon={<ContentCutIcon fontSize="small" />} />
    </Stack>
  );
};
