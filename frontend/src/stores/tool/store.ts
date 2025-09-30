import { produce } from "immer";
import { createContext, useContext } from "react";
import { Matrix4 } from "three";
import { create, useStore, type StoreApi } from "zustand";

export type ToolState = {
  content: ToolContent;
  setContent: (value: ToolContent) => void;
};

export type ToolContent =
  | null
  | { type: "select" }
  | { type: "clip"; matrix: Matrix4 };

export const createToolStore = () =>
  create<ToolState>((set) => ({
    content: null,
    setContent: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.content = value;
        })
      ),
  }));

export const ToolStoreContext = createContext<StoreApi<ToolState> | null>(null);

export const useToolStore = <T>(selector: (state: ToolState) => T): T => {
  const store = useContext(ToolStoreContext)!;
  return useStore(store, selector);
};

export const createToolContent = (
  tool: NonNullable<ToolContent>["type"]
): ToolContent => {
  switch (tool) {
    case "select":
      return { type: "select" };

    case "clip":
      return { type: "clip", matrix: new Matrix4() };
  }
};
