import { produce } from "immer";
import { createContext, useContext } from "react";
import { create, useStore, type StoreApi } from "zustand";

export type ViewportState = {
  cameraMoving: boolean;
  setCameraMoving: (value: boolean) => void;
};

export const createViewportStore = () =>
  create<ViewportState>((set) => ({
    cameraMoving: false,
    setCameraMoving: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.cameraMoving = value;
        })
      ),
  }));

export const ViewportContext = createContext<StoreApi<ViewportState> | null>(
  null
);

export const useViewportStore = <T>(
  selector: (state: ViewportState) => T
): T => {
  const store = useContext(ViewportContext)!;
  return useStore(store, selector);
};
