import {
  createPropertyStore,
  type PropertyState,
  PropertyStoreContext,
} from "@stores/property/store";
import { type PropsWithChildren, useState } from "react";
import type { StoreApi, UseBoundStore } from "zustand";

export const PropertyStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState<UseBoundStore<StoreApi<PropertyState>>>(() =>
    createPropertyStore()
  );
  return (
    <PropertyStoreContext.Provider value={store}>
      {children}
    </PropertyStoreContext.Provider>
  );
};
