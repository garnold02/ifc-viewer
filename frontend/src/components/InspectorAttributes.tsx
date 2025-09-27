import {
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
import { useOutlinerStore } from "../stores/outlinerStore";
import { useGetIfcAttributes } from "../api/queries/ifcAttributes";
import { useIfcContext } from "../contexts/ifc";

export const InspectorAttributes = () => {
  const { ifcId } = useIfcContext();
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const { data: attributes } = useGetIfcAttributes(ifcId, selectedNodeId);
  const { t } = useTranslation();

  if (selectedNodeId === null) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography fontStyle="italic" color="textDisabled">
          {t("components.InspectorAttributes.none_selected")}
        </Typography>
      </Stack>
    );
  }

  if (attributes === undefined) {
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
    <TableContainer sx={{ height: "100%" }}>
      <Table>
        <TableBody>
          {attributes.map((attribute) => (
            <TableRow key={attribute.name}>
              <TableCell>
                <Typography fontSize="0.875rem" fontWeight="bold">
                  {attribute.name}
                </Typography>
              </TableCell>
              <TableCell>
                {attribute.value === null ? (
                  <Typography
                    fontSize="0.875rem"
                    fontStyle="italic"
                    color="textDisabled"
                  >
                    {t("components.InspectorAttributes.no_value")}
                  </Typography>
                ) : (
                  <Typography fontSize="0.875rem">
                    {String(attribute.value)}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
