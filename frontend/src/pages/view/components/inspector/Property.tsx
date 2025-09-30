import { TableRow } from "@mui/material";
import type { IfcProperty } from "../../../../types/ifc";
import { PropertyValue } from "./PropertyValue";
import { PropertyName } from "./PropertyName";
import { PropertyUnit } from "./PropertyUnit";

type Props = {
  property: IfcProperty;
};

export const Property = ({ property }: Props) => {
  return (
    <TableRow>
      <PropertyName type={property.value.type} name={property.name} />
      <PropertyValue propertyValue={property.value} />
      <PropertyUnit />
    </TableRow>
  );
};
