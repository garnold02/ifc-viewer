import {
  createThemeStore,
  type ThemeState,
  ThemeStoreContext,
} from "@stores/theme/store";
import { type PropsWithChildren, useState } from "react";
import type { StoreApi, UseBoundStore } from "zustand";

export const ThemeStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState<UseBoundStore<StoreApi<ThemeState>>>(() =>
    createThemeStore()
  );
  return (
    <ThemeStoreContext.Provider value={store}>
      {children}
    </ThemeStoreContext.Provider>
  );
};
