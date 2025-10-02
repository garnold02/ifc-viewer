import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import type { IfcPropertySet } from "../../../../types/ifc";
import { Property } from "./Property";
import { PropertySetHeader } from "./PropertySetHeader";

type Props = {
  propertySet: IfcPropertySet;
  ordinal?: number;
};

export const PropertySet = ({ propertySet, ordinal }: Props) => {
  return (
    <Accordion>
      <AccordionSummary>
        {ordinal !== undefined ? `${ordinal}. ` : null}
        {propertySet.name}
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableHead>
              <PropertySetHeader />
            </TableHead>
            <TableBody>
              {propertySet.properties.map((property) => (
                <Property key={property.name} property={property} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
