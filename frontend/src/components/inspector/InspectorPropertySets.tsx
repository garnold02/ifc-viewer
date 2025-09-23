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
import { useGetPropertySets } from "../../api/queries/psets/useGetPsets";
import { useOutlinerStore } from "../outliner/store";
import { useTranslation } from "react-i18next";
import { InspectorPropertyValue } from "./InspectorPropertyValue";
import { InspectorPropertyValueIcon } from "./InspectorPropertyValueIcon";

export const InspectorPropertySets = () => {
  const { t } = useTranslation();
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const { data: propertySets } = useGetPropertySets(selectedNodeId);

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

  if (propertySets === null) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography fontStyle="italic" color="textDisabled">
          {t("component.inspector.none_selected")}
        </Typography>
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
