import { useTranslation } from "react-i18next";
import type { IfcPropertyValue } from "../../../../types/ifc";
import { TableCell } from "@mui/material";

type Props = {
  propertyValue: IfcPropertyValue;
};

export const PropertyValue = ({ propertyValue }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.PropertyValue",
  });

  switch (propertyValue.type) {
    case "area":
      return <TableCell>{String(propertyValue.area)}</TableCell>;

    case "bounded":
      return (
        <TableCell color="text.disabled" sx={{ fontStyle: "italic" }}>
          TODO
        </TableCell>
      );

    case "complex":
      return (
        <TableCell color="text.disabled" sx={{ fontStyle: "italic" }}>
          TODO
        </TableCell>
      );

    case "count":
      return <TableCell>{String(propertyValue.count)}</TableCell>;

    case "enumerated":
      return (
        <TableCell color="text.disabled" sx={{ fontStyle: "italic" }}>
          TODO
        </TableCell>
      );

    case "length":
      return <TableCell>{String(propertyValue.length)}</TableCell>;

    case "list":
      return (
        <TableCell color="text.disabled" sx={{ fontStyle: "italic" }}>
          TODO
        </TableCell>
      );

    case "reference":
      return (
        <TableCell color="text.disabled" sx={{ fontStyle: "italic" }}>
          TODO
        </TableCell>
      );

    case "single":
      switch (propertyValue.single) {
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
          return <TableCell>{String(propertyValue.single)}</TableCell>;
      }

    case "table":
      return (
        <TableCell color="text.disabled" sx={{ fontStyle: "italic" }}>
          TODO
        </TableCell>
      );

    case "time":
      return <TableCell>{String(propertyValue.time)}</TableCell>;

    case "volume":
      return <TableCell>{String(propertyValue.volume)}</TableCell>;

    case "weight":
      return <TableCell>{String(propertyValue.weight)}</TableCell>;
  }
};
