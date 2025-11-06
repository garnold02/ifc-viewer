import { type LeafProperty as LeafPropertyType } from "@api/types/property";
import { Stack, TableCell, TableRow } from "@mui/material";
import { DescriptionTooltip } from "@pages/view/components/property/DescriptionTooltip";
import { ExpandButton } from "@pages/view/components/property/ExpandButton";
import { LeafPropertyValue } from "@pages/view/components/property/LeafPropertyValue";

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
