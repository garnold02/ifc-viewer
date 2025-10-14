import { useGetIfcAttributes } from "../../../../api/hooks/ifcAttributes";
import { useTranslation } from "react-i18next";
import { useIfcStore } from "../../../../stores/ifc/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  LinearProgress,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { AttributesHeader } from "./AttributesHeader";
import { Attribute } from "./Attribute";

type Props = {
  id: number;
  defaultExpanded?: boolean;
};

export const Attributes = ({ id, defaultExpanded }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.attributes.Attributes",
  });

  const fileId = useIfcStore((state) => state.fileId);
  const { data: attributes } = useGetIfcAttributes(fileId, id);

  if (attributes === undefined) {
    return <LinearProgress />;
  }

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary>{t("title")}</AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableHead>
              <AttributesHeader />
            </TableHead>
            <TableBody>
              {attributes.map((attribute, i) => (
                <Attribute
                  key={`${attribute.name}-${i}`}
                  attribute={attribute}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
