import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, Tooltip } from "@mui/material";
import { useThemeStore } from "@stores/theme/store";
import { useTranslation } from "react-i18next";

export const ThemeToggle = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.ThemeToggle",
  });

  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);

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
