import { useMemo, type PropsWithChildren } from "react";
import { createPropertyStore, PropertyStoreContext } from "./store";

export const PropertyStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => createPropertyStore(), []);
  return (
    <PropertyStoreContext.Provider value={store}>
      {children}
    </PropertyStoreContext.Provider>
  );
};
