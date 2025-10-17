import { LanguageMenu } from "@components/LanguageMenu";
import LanguageIcon from "@mui/icons-material/Language";
import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageButton = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.LanguageButton",
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const onClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  }, []);

  const onMenuClose = useCallback(() => {
    setMenuOpen(false);
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Tooltip title={t("tooltip")}>
        <IconButton size="small" onClick={onClick}>
          <LanguageIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <LanguageMenu anchorEl={anchorEl} open={menuOpen} onClose={onMenuClose} />
    </>
  );
};
