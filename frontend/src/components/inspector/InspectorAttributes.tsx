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
import { useOutlinerStore } from "../outliner/store";
import { useGetAttributes } from "../../api/queries/attributes/useGetAttributes";
import { useMemo } from "react";

export const InspectorAttributes = () => {
  const { t } = useTranslation();
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const { data: attributes } = useGetAttributes(selectedNodeId);

  const sortedAttributes = useMemo(
    () =>
      attributes !== undefined && attributes !== null
        ? attributes
            .map((attribute) => ({
              name: t(`ifc.attribute.${attribute.name}`, {
                defaultValue: attribute.name,
              }),
              value: attribute.value,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
        : null,
    [attributes]
  );

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

  if (sortedAttributes === null) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography fontStyle="italic" color="textDisabled">
          {t("component.inspector.attributes.none_selected")}
        </Typography>
      </Stack>
    );
  }

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table>
        <TableBody>
          {sortedAttributes.map((attribute) => (
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
                    {t("component.inspector.attributes.no_value")}
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
