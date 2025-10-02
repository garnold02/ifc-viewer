import { create, useStore, type StoreApi } from "zustand";
import type { IfcElement } from "../../types/ifc";
import { createContext, useContext } from "react";
import { produce } from "immer";
import { defaultVisibilityOf } from "../../utils/visibility";
import { Matrix4 } from "three";

export type IfcState = {
  fileId: number;
  elements: Record<number, IfcElement>;
  selectedElement: IfcElement | null;
  setSelectedElement: (value: IfcElement | null) => void;
  outlinerNodeStates: Record<number, OutlinerNodeState>;
  setOutlinerNodeState: (element: IfcElement, state: OutlinerNodeState) => void;
  tool: {
    current: ToolName | null;
    setCurrent: (value: ToolName | null) => void;
    clip: {
      alwaysVisible: boolean;
      setAlwaysVisible: (value: boolean) => void;
      matrix: Matrix4;
      setMatrix: (value: Matrix4) => void;
    };
  };
  details: {
    elementStack: number[];
    pushElement: (value: number) => void;
    popElement: () => void;
    clearElementStack: () => void;
    revertElementStack: (position: number) => void;
  };
};

export type OutlinerNodeState = {
  expanded: boolean;
  selfVisible: boolean;
  childrenVisible: boolean;
};

export type ToolName = "select" | "clip";

export const createIfcStore = (
  fileId: number,
  elements: Record<number, IfcElement>
) =>
  create<IfcState>((set) => ({
    fileId,
    elements,
    selectedElement: null,
    setSelectedElement: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.selectedElement = value;
        })
      ),
    outlinerNodeStates: {},
    setOutlinerNodeState: (element, state) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.outlinerNodeStates[element.id] = state;
        })
      ),
    tool: {
      current: null,
      setCurrent: (value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.tool.current = value;
          })
        ),
      clip: {
        alwaysVisible: false,
        setAlwaysVisible: (value) =>
          set((prev) =>
            produce(prev, (draft) => {
              draft.tool.clip.alwaysVisible = value;
            })
          ),
        matrix: new Matrix4(),
        setMatrix: (value) =>
          set((prev) =>
            produce(prev, (draft) => {
              draft.tool.clip.matrix = new Matrix4().copy(value);
            })
          ),
      },
    },
    details: {
      elementStack: [],
      pushElement: (value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.details.elementStack.push(value);
          })
        ),
      popElement: () =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.details.elementStack.pop();
          })
        ),
      clearElementStack: () =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.details.elementStack = [];
          })
        ),
      revertElementStack: (position) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.details.elementStack.length = position + 1;
          })
        ),
    },
  }));

export const createDefaultOutlinerNodeState = (
  element: IfcElement
): OutlinerNodeState => ({
  expanded: false,
  selfVisible: defaultVisibilityOf(element.type),
  childrenVisible: true,
});

export const IfcStoreContext = createContext<StoreApi<IfcState> | null>(null);

export const useIfcStore = <T>(selector: (state: IfcState) => T): T => {
  const store = useContext(IfcStoreContext)!;
  return useStore(store, selector);
};
