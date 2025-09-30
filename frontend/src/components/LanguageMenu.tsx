import { ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};

export const LanguageMenu = ({ anchorEl, open, onClose }: Props) => {
  const { i18n } = useTranslation();
  const setLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
      onClose();
    },
    [i18n, onClose]
  );

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuList>
        <MenuItem onClick={() => setLanguage("en_US")}>
          <ListItemText>English</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setLanguage("hu_HU")}>
          <ListItemText>Magyar</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
