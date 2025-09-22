import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const InspectorPropertySets = () => {
  const { t } = useTranslation();
  return (
    <Typography>{t("component.inspector.property_sets.title")}</Typography>
  );
};
