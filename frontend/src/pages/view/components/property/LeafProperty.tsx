import { Stack, TableCell, TableRow } from "@mui/material";
import type { LeafProperty as LeafPropertyType } from "../../../../api/types/file/element/property";
import { LeafPropertyValue } from "./LeafPropertyValue";
import { ExpandButton } from "./ExpandButton";
import { DescriptionTooltip } from "./DescriptionTooltip";

type Props = {
  leafProperty: LeafPropertyType;
  level: number;
};

export const LeafProperty = ({ leafProperty, level }: Props) => {
  return (
    <TableRow>
      <TableCell sx={{ paddingLeft: level * 2 }}>
        <Stack direction="row" alignItems="center">
          <ExpandButton />
          {leafProperty.name}
          <DescriptionTooltip description={leafProperty.description} />
        </Stack>
      </TableCell>
      <LeafPropertyValue leafProperty={leafProperty} />
    </TableRow>
  );
};
