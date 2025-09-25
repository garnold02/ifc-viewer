import { produce } from "immer";
import { createContext, useContext } from "react";
import { create, useStore, type StoreApi } from "zustand";

export type ToolbarState = {
  selectedTool: ToolName | null;
  setSelectedTool: (value: ToolName | null) => void;
};

export type ToolName =
  | "select"
  | "measure_length"
  | "measure_area"
  | "measure_volume";

export const createToolbarStore = () =>
  create<ToolbarState>((set) => ({
    selectedTool: null,
    setSelectedTool: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.selectedTool = value;
        })
      ),
  }));

export const ToolbarContext = createContext<StoreApi<ToolbarState> | null>(
  null
);

export const useToolbarStore = <T>(selector: (state: ToolbarState) => T): T => {
  const store = useContext(ToolbarContext)!;
  return useStore(store, selector);
};
