import { IconButton, Tooltip, useColorScheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTranslation } from "react-i18next";

export const ThemeToggle = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.ThemeToggle",
  });

  const { mode, setMode } = useColorScheme();

  return (
    <Tooltip title={t(mode === "dark" ? "use_light" : "use_dark")}>
      <IconButton
        size="small"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        <DarkModeIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
