import { Branding } from "@components/Branding";
import { LanguageButton } from "@components/LanguageButton";
import { ThemeToggle } from "@components/ThemeToggle";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Stack } from "@mui/material";
import { ToolButton } from "@pages/view/components/toolbar/ToolButton";

export const ToolBar = () => {
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
        <ToolButton type="select" icon={<PanToolAltIcon fontSize="small" />} />
        <ToolButton type="clip" icon={<ContentCutIcon fontSize="small" />} />
        <ToolButton
          type="measure_length"
          icon={<SquareFootIcon fontSize="small" />}
        />
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
