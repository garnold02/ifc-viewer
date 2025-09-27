import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import type { PropertySetPropertyValue } from "../api/queries/ifcPropertySets";

type Props = {
  value: PropertySetPropertyValue;
};

export const InspectorPropertyValue = ({ value }: Props) => {
  const { t } = useTranslation();

  switch (value.type) {
    case "area":
      return <Typography fontSize="0.875rem">{String(value.area)}</Typography>;

    case "bounded":
      return null;

    case "complex":
      return null;

    case "count":
      return <Typography fontSize="0.875rem">{String(value.count)}</Typography>;

    case "enumerated":
      return null;

    case "length":
      return (
        <Typography fontSize="0.875rem">{String(value.length)}</Typography>
      );

    case "list":
      return null;

    case "reference":
      return null;

    case "single":
      if (
        value.single === null ||
        (typeof value.single === "string" && value.single.length === 0)
      ) {
        return (
          <Typography
            fontSize="0.875rem"
            fontStyle="italic"
            color="textDisabled"
          >
            {t("components.InspectorPropertyValue.no_value")}
          </Typography>
        );
      }

      if (typeof value.single === "boolean") {
        return (
          <Typography fontSize="0.875rem">
            {t(
              `components.InspectorPropertyValue.${value.single ? "true" : "false"}`
            )}
          </Typography>
        );
      }

      return (
        <Typography fontSize="0.875rem">{String(value.single)}</Typography>
      );

    case "table":
      return null;

    case "time":
      return <Typography fontSize="0.875rem">{String(value.time)}</Typography>;

    case "volume":
      return (
        <Typography fontSize="0.875rem">{String(value.volume)}</Typography>
      );

    case "weight":
      return (
        <Typography fontSize="0.875rem">{String(value.weight)}</Typography>
      );

    default:
      return null;
  }
};
