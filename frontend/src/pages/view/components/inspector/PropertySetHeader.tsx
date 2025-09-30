import { TableCell, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";

export const PropertySetHeader = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.PropertySetHeader",
  });

  return (
    <TableRow>
      <TableCell>{t("name")}</TableCell>
      <TableCell>{t("value")}</TableCell>
      <TableCell>{t("unit")}</TableCell>
    </TableRow>
  );
};
