import { Branding } from "@components/Branding";
import { LanguageButton } from "@components/LanguageButton";
import { ThemeToggle } from "@components/ThemeToggle";
import { Box, Divider, Stack } from "@mui/material";
import { UploadButton } from "@pages/index/components/UploadButton";

export const AppBar = () => {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" padding={1} gap={1}>
        <Branding />
        <Box flexGrow={1} />
        <UploadButton />
        <LanguageButton />
        <ThemeToggle />
      </Stack>
      <Divider />
    </Stack>
  );
};
