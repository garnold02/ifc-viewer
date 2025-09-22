import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const InspectorAttributes = () => {
  const { t } = useTranslation();
  return <Typography>{t("component.inspector.attributes.title")}</Typography>;
};
