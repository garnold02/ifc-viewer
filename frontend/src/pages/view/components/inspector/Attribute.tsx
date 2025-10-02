import { TableRow } from "@mui/material";
import type { IfcAttribute } from "../../../../types/ifc";
import { AttributeName } from "./AttributeName";
import { AttributeValue } from "./AttributeValue";

type Props = {
  attribute: IfcAttribute;
};

export const Attribute = ({ attribute }: Props) => {
  return (
    <TableRow>
      <AttributeName name={attribute.name} />
      <AttributeValue value={attribute.value} />
    </TableRow>
  );
};
