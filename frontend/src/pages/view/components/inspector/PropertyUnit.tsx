import { TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";

export const PropertyUnit = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.PropertyUnit",
  });

  return (
    <TableCell sx={{ color: "text.disabled", fontStyle: "italic" }}>
      {t("no_value")}
    </TableCell>
  );
};
