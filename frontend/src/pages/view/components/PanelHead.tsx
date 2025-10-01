import { Divider, Stack, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
}>;

export const PanelHead = ({ title, children }: Props) => {
  return (
    <>
      <Stack direction="row" alignItems="center" gap={1} marginLeft={1}>
        <Typography variant="overline" sx={{ userSelect: "none" }} noWrap>
          {title}
        </Typography>
        {children}
      </Stack>
      <Divider />
    </>
  );
};
