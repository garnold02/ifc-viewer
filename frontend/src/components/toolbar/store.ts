import { produce } from "immer";
import { createContext, useContext } from "react";
import { create, useStore, type StoreApi } from "zustand";

export type ToolbarState = {
  selectedTool: Tool;
  setSelectedTool: (value: Tool) => void;
};

type Tool = "select" | null;

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
