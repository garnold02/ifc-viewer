import { TableCell, Tooltip } from "@mui/material";
import type { LeafProperty } from "../../../../api/types/file/element/property";
import { useTranslation } from "react-i18next";
import { ElementReference } from "../ElementReference";

type Props = {
  leafProperty: LeafProperty;
};

export const LeafPropertyValue = ({ leafProperty }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.property.LeafPropertyValue",
  });

  switch (leafProperty.semantics) {
    case "boolean": {
      return (
        <TableCell sx={{ fontStyle: "italic" }}>
          {t(`${leafProperty.value}`)}
        </TableCell>
      );
    }

    case "element": {
      return (
        <TableCell>
          <ElementReference id={leafProperty.value} />
        </TableCell>
      );
    }

    case "null": {
      return (
        <TableCell sx={{ color: "text.disabled", fontStyle: "italic" }}>
          {t("null")}
        </TableCell>
      );
    }

    case "number": {
      const rounded = Math.round(leafProperty.value * 10000) / 10000;
      const value =
        leafProperty.unit !== null
          ? `${rounded} ${leafProperty.unit}`
          : String(rounded);

      const tooltip =
        leafProperty.unit !== null
          ? `${leafProperty.value} ${leafProperty.unit}`
          : String(leafProperty.value);

      const cell = <TableCell>{value}</TableCell>;

      return value === tooltip ? (
        cell
      ) : (
        <Tooltip title={tooltip}>{cell}</Tooltip>
      );
    }

    case "string": {
      if (leafProperty.value.length === 0) {
        return (
          <TableCell sx={{ color: "text.disabled", fontStyle: "italic" }}>
            {t("null")}
          </TableCell>
        );
      }

      return <TableCell>{leafProperty.value}</TableCell>;
    }

    default: {
      const rounded = Math.round(leafProperty.value * 10000) / 10000;
      const value =
        leafProperty.unit !== null
          ? `${rounded} ${leafProperty.unit}`
          : String(rounded);

      const tooltip =
        leafProperty.unit !== null
          ? `${leafProperty.value} ${leafProperty.unit}`
          : String(leafProperty.value);

      const cell = <TableCell>{value}</TableCell>;

      return value === tooltip ? (
        cell
      ) : (
        <Tooltip title={tooltip}>{cell}</Tooltip>
      );
    }
  }
};
