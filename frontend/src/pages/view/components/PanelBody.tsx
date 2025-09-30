import { Stack } from "@mui/material";
import type { PropsWithChildren } from "react";

export const PanelBody = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      padding={1}
      gap={1}
      sx={{ overflowX: "hidden", overflowY: "scroll" }}
    >
      {children}
    </Stack>
  );
};
