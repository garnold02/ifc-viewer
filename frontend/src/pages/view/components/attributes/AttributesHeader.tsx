import { TableCell, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";

export const AttributesHeader = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.attributes.AttributesHeader",
  });

  return (
    <TableRow>
      <TableCell>{t("name")}</TableCell>
      <TableCell>{t("value")}</TableCell>
    </TableRow>
  );
};
