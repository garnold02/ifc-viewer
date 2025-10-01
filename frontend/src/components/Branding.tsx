import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import { IconButtonLink } from "./IconButtonLink";
import HomeIcon from "@mui/icons-material/Home";

export const Branding = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "components.Branding" });
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <IconButtonLink size="small" to="/">
        <HomeIcon fontSize="small" />
      </IconButtonLink>
      <Typography sx={{ userSelect: "none" }}>{t("title")}</Typography>
    </Stack>
  );
};
