import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeStoreProvider } from "@stores/theme/Provider";
import { useThemeStore } from "@stores/theme/store";
import { type PropsWithChildren, useMemo } from "react";

export const ToggleableThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeStoreProvider>
      <Inner>{children}</Inner>
    </ThemeStoreProvider>
  );
};

const Inner = ({ children }: PropsWithChildren) => {
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
        },
      }),
    []
  );

  const mode = useThemeStore((state) => state.mode);

  const currentTheme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [darkTheme, lightTheme, mode]
  );

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};
