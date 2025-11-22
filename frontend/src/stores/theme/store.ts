import { produce } from "immer";
import { createContext, useContext } from "react";
import { create, type StoreApi, useStore } from "zustand";

export type ThemeState = {
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
};

export const createThemeStore = (initial?: "dark" | "light") =>
  create<ThemeState>((set) => ({
    mode: initial !== undefined ? initial : loadMode(),
    setMode: (mode) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.mode = mode;
          saveMode(mode);
        })
      ),
  }));

export const ThemeStoreContext = createContext<StoreApi<ThemeState> | null>(
  null
);

export const useThemeStore = <T>(selector: (state: ThemeState) => T): T => {
  const store = useContext(ThemeStoreContext)!;
  return useStore(store, selector);
};

const loadMode = (): "dark" | "light" => {
  if (window === undefined) {
    return "dark";
  }

  if (window.localStorage === undefined) {
    return "dark";
  }

  if (window.localStorage.getItem === undefined) {
    return "dark";
  }

  const loaded = window.localStorage.getItem("themeMode");

  if (loaded === null) {
    return "dark";
  }

  if (loaded === "light") {
    return "light";
  }

  return "dark";
};

const saveMode = (mode: "dark" | "light") => {
  if (window === undefined) {
    return;
  }

  if (window.localStorage === undefined) {
    return;
  }

  if (window.localStorage.setItem === undefined) {
    return;
  }

  window.localStorage.setItem("themeMode", mode);
};
