import {
  createPropertyStore,
  PropertyStoreContext,
} from "@stores/property/store";
import { type PropsWithChildren, useMemo } from "react";

export const PropertyStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => createPropertyStore(), []);
  return (
    <PropertyStoreContext.Provider value={store}>
      {children}
    </PropertyStoreContext.Provider>
  );
};
