import { useTranslation } from "react-i18next";
import { type IfcAttributeValue } from "../../../../types/ifc";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { ElementReference } from "./ElementReference";

type Props = {
  value: IfcAttributeValue;
};

export const AttributeValue = ({ value }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.AttributeValue",
  });

  switch (value.type) {
    case "value":
      switch (value.value) {
        case null:
          return (
            <TableCell sx={{ color: "text.disabled", fontStyle: "italic" }}>
              {t("null")}
            </TableCell>
          );

        case true:
          return (
            <TableCell sx={{ fontStyle: "italic" }}>{t("true")}</TableCell>
          );

        case false:
          return (
            <TableCell sx={{ fontStyle: "italic" }}>{t("false")}</TableCell>
          );

        case "":
          return (
            <TableCell sx={{ color: "text.disabled", fontStyle: "italic" }}>
              {t("empty_text")}
            </TableCell>
          );

        default:
          return <TableCell>{String(value.value)}</TableCell>;
      }

    case "element":
      return (
        <TableCell>
          <ElementReference id={value.value} />
        </TableCell>
      );

    case "list":
      return (
        <TableCell>
          <TableContainer>
            <Table>
              <TableBody>
                {value.value.map((value, i) => (
                  <TableRow key={i}>
                    <AttributeValue value={value} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableCell>
      );
  }
};
