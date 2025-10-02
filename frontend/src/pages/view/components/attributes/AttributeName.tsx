import { Stack, TableCell } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";

type Props = {
  name: string;
};

export const AttributeName = ({ name }: Props) => {
  return (
    <TableCell>
      <Stack direction="row" gap={1} alignItems="center">
        <BuildIcon fontSize="small" />
        {name}
      </Stack>
    </TableCell>
  );
};
