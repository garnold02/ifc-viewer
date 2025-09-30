import { Stack, TableCell } from "@mui/material";
import type { IfcPropertyValue } from "../../../../types/ifc";
import { PropertyIcon } from "./PropertyIcon";

type Props = {
  type: IfcPropertyValue["type"];
  name: string;
};

export const PropertyName = ({ type, name }: Props) => {
  return (
    <TableCell>
      <Stack direction="row" gap={1} alignItems="center">
        <PropertyIcon type={type} />
        {name}
      </Stack>
    </TableCell>
  );
};
