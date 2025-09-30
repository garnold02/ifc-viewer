import { Stack } from "@mui/material";
import type { PropsWithChildren } from "react";

export const Panel = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      {children}
    </Stack>
  );
};
