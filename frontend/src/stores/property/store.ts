import { produce } from "immer";
import { createContext, useContext } from "react";
import { create, type StoreApi, useStore } from "zustand";

export type PropertyState = {
  expansionStates: Record<string, boolean>;
  setExpanded: (path: string, expanded: boolean) => void;
};

export const createPropertyStore = () =>
  create<PropertyState>((set) => ({
    expansionStates: {},
    setExpanded: (path, expanded) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.expansionStates[path] = expanded;
        })
      ),
  }));

export const PropertyStoreContext =
  createContext<StoreApi<PropertyState> | null>(null);

export const usePropertyStore = <T>(
  selector: (state: PropertyState) => T
): T => {
  const store = useContext(PropertyStoreContext)!;
  return useStore(store, selector);
};
