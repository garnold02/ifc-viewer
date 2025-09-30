import { Stack } from "@mui/material";
import { ToolButton } from "./ToolButton";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { useToolStore } from "../../../../stores/tool/store";
import { LanguageButton } from "../../../../components/LanguageButton";
import { ThemeToggle } from "../../../../components/ThemeToggle";
import { Branding } from "../../../../components/Branding";

export const ToolBar = () => {
  const clipVisible = useToolStore((state) => state.clipState.visible);
  return (
    <Stack direction="row" padding={1} gap={1}>
      <Stack direction="row" alignItems="center" flexBasis={0} flexGrow={1}>
        <Branding />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexBasis={0}
        flexGrow={1}
        gap={1}
      >
        <ToolButton
          type="select"
          icon={<PanToolAltIcon fontSize="small" />}
          disabled={clipVisible}
        />
        <ToolButton type="clip" icon={<ContentCutIcon fontSize="small" />} />
      </Stack>
      <Stack
        direction="row"
        justifyContent="right"
        alignItems="center"
        flexBasis={0}
        flexGrow={1}
        gap={1}
      >
        <LanguageButton />
        <ThemeToggle />
      </Stack>
    </Stack>
  );
};
