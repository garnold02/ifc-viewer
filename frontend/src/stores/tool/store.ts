import { produce } from "immer";
import { createContext, useContext } from "react";
import { Matrix4 } from "three";
import { create, useStore, type StoreApi } from "zustand";

export type ToolState = {
  current: ToolType | null;
  setCurrent: (value: ToolType | null) => void;
  clipState: ClipToolState;
  setClipVisible: (value: boolean) => void;
  setClipMatrix: (value: Matrix4) => void;
};

export type ToolType = "select" | "clip";

export type ClipToolState = {
  visible: boolean;
  matrix: Matrix4;
};

export const createToolStore = () =>
  create<ToolState>((set) => ({
    current: null,
    setCurrent: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.current = value;
        })
      ),
    clipState: { visible: false, matrix: new Matrix4() },
    setClipVisible: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.clipState.visible = value;
        })
      ),
    setClipMatrix: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.clipState.matrix = new Matrix4().copy(value);
        })
      ),
  }));

export const ToolStoreContext = createContext<StoreApi<ToolState> | null>(null);

export const useToolStore = <T>(selector: (state: ToolState) => T): T => {
  const store = useContext(ToolStoreContext)!;
  return useStore(store, selector);
};
