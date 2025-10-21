import type { Element } from "@api/types/file/element";
import { defaultVisibilityOf } from "@utils/visibility";
import { produce } from "immer";
import { createContext, useContext } from "react";
import { Matrix4 } from "three";
import { create, type StoreApi, useStore } from "zustand";

export type IfcState = {
  fileId: number;
  elements: Record<number, Element>;

  selectedElement: Element | null;
  setSelectedElement: (value: Element | null) => void;

  outliner: {
    selfVisibility: Record<number, boolean>;
    setSelfVisible: (id: number, value: boolean) => void;

    childrenVisibility: Record<number, boolean>;
    setChildrenVisible: (id: number, value: boolean) => void;

    expansion: Record<number, boolean>;
    setExpanded: (id: number, value: boolean) => void;
  };

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
  elements: Record<number, Element>
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

    outliner: {
      selfVisibility: {},
      setSelfVisible: (id, value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.outliner.selfVisibility[id] = value;
          })
        ),

      childrenVisibility: {},
      setChildrenVisible: (id, value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.outliner.childrenVisibility[id] = value;
          })
        ),

      expansion: {},
      setExpanded: (id, value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.outliner.expansion[id] = value;
          })
        ),
    },

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
  element: Element
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
