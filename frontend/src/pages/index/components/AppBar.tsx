import { Branding } from "@components/Branding";
import { LanguageButton } from "@components/LanguageButton";
import { ThemeToggle } from "@components/ThemeToggle";
import { Box, Divider, Stack } from "@mui/material";

export const AppBar = () => {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" padding={1} gap={1}>
        <Branding />
        <Box flexGrow={1} />
        <LanguageButton />
        <ThemeToggle />
      </Stack>
      <Divider />
    </Stack>
  );
};
