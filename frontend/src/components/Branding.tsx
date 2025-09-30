import { Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";

export const Branding = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.Branding" });
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <HomeIcon />
      <Typography sx={{ userSelect: "none" }}>{t("title")}</Typography>
    </Stack>
  );
};
