import { Stack } from "@mui/material";
import { ToolbarToggleSelectButton } from "./ToolbarToggleSelectButton";

export const Toolbar = () => {
  return (
    <Stack direction="row" justifyContent="center" gap={1}>
      <ToolbarToggleSelectButton />
    </Stack>
  );
};
