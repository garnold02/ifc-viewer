import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { InspectorPropertyValue } from "./InspectorPropertyValue";
import { InspectorPropertyValueIcon } from "./InspectorPropertyValueIcon";
import { useIfcContext } from "../contexts/ifc";
import { useOutlinerStore } from "../stores/outlinerStore";
import { useGetIfcPropertySets } from "../api/queries/ifcPropertySets";

export const InspectorPropertySets = () => {
  const { ifcId } = useIfcContext();
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const { data: propertySets } = useGetIfcPropertySets(ifcId, selectedNodeId);
  const { t } = useTranslation();

  if (selectedNodeId === null) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography fontStyle="italic" color="textDisabled">
          {t("components.InspectorPropertySets.none_selected")}
        </Typography>
      </Stack>
    );
  }

  if (propertySets === undefined) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack gap={1} sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      {propertySets.map((propertySet) => (
        <Accordion key={propertySet.name}>
          <AccordionSummary>
            <Typography fontSize="0.875rem" fontWeight="bold">
              {propertySet.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table>
                <TableBody>
                  {propertySet.properties.map((property) => (
                    <TableRow key={property.name}>
                      <TableCell>
                        <Stack direction="row" gap={1}>
                          <InspectorPropertyValueIcon
                            valueType={property.value.type}
                          />
                          <Typography fontSize="0.875rem" fontWeight="bold">
                            {property.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <InspectorPropertyValue value={property.value} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};
