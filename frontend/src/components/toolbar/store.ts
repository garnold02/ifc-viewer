import { produce } from "immer";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Vector3 } from "three";
import { create, useStore, type StoreApi } from "zustand";

export type ToolbarState = {
  toolState: ToolState | null;
  setToolState: Dispatch<SetStateAction<ToolState | null>>;
};

export type ToolState =
  | { type: "select" }
  | { type: "measure_length"; points: Vector3[] }
  | { type: "measure_area" }
  | { type: "measure_volume" };

export type ToolName = ToolState["type"];

export const createToolbarStore = () =>
  create<ToolbarState>((set) => ({
    toolState: createDefaultToolState(null),
    setToolState: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.toolState =
            typeof value === "function" ? value(prev.toolState) : value;
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

export const createDefaultToolState = (
  toolName: ToolName | null
): ToolState | null => {
  switch (toolName) {
    case null:
      return null;

    case "select":
      return { type: "select" };

    case "measure_length":
      return { type: "measure_length", points: [] };

    case "measure_area":
      return { type: "measure_area" };

    case "measure_volume":
      return { type: "measure_volume" };
  }
};
