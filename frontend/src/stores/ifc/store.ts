import type { Element } from "@api/types/element";
import { produce } from "immer";
import { createContext, useContext } from "react";
import { Matrix4, Vector3 } from "three";
import { create, type StoreApi, useStore } from "zustand";

export type IfcState = {
  fileId: number;
  elements: Record<number, Element>;

  filter: {
    elementTypes: string[];
    setElementTypes: (value: string[]) => void;

    invert: boolean;
    setInvert: (value: boolean) => void;

    showInViewport: boolean;
    setShowInViewport: (value: boolean) => void;

    elements: Record<number, Element>;
  };

  selection: {
    multi: boolean;
    setMulti: (value: boolean) => void;
    elementIds: number[];
    setElementIds: (value: number[]) => void;
    selectElement: (id: number, exclusive?: boolean) => void;
    deselectElement: (id: number) => void;
    toggleElementSelection: (id: number, exclusive?: boolean) => void;
  };

  outliner: {
    selfVisibility: Record<number, boolean>;
    setSelfVisible: (id: number, value: boolean) => void;

    childrenVisibility: Record<number, boolean>;
    setChildrenVisible: (id: number, value: boolean) => void;

    expansion: Record<number, boolean>;
    setExpanded: (id: number, value: boolean) => void;

    unhideAll: () => void;
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

    measure_distance: {
      state: MeasureDistanceState;
      setState: (value: MeasureDistanceState) => void;
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

export type MeasureDistanceState =
  | {
      stage: "1";
      firstPointCandidate: Vector3 | null;
    }
  | {
      stage: "2";
      firstPoint: Vector3;
      secondPointCandidate: Vector3 | null;
    }
  | {
      stage: "3";
      firstPoint: Vector3;
      secondPoint: Vector3;
    };

export type ToolName = "select" | "clip" | "measure_length";

export const createIfcStore = (
  fileId: number,
  elements: Record<number, Element>
) =>
  create<IfcState>((set) => ({
    fileId,
    elements,

    filter: {
      elementTypes: [],
      setElementTypes: (value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.filter.elementTypes = value;
            draft.filter.elements = recalculateFilteredElements(
              prev.elements,
              draft.filter.elementTypes,
              prev.filter.invert
            );
          })
        ),

      invert: false,
      setInvert: (value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.filter.invert = value;
            draft.filter.elements = recalculateFilteredElements(
              prev.elements,
              prev.filter.elementTypes,
              draft.filter.invert
            );
          })
        ),

      showInViewport: true,
      setShowInViewport: (value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.filter.showInViewport = value;
          })
        ),

      elements,
    },

    selection: {
      multi: false,
      setMulti: (value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.selection.multi = value;
          })
        ),

      elementIds: [],
      setElementIds: (value) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.selection.elementIds = value;
          })
        ),

      selectElement: (id, exclusive) =>
        set((prev) =>
          produce(prev, (draft) => {
            if (!prev.selection.elementIds.includes(id)) {
              if (exclusive) {
                draft.selection.elementIds = [];
              }
              draft.selection.elementIds.push(id);
            }
          })
        ),

      deselectElement: (id) =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.selection.elementIds = prev.selection.elementIds.filter(
              (eId) => eId !== id
            );
          })
        ),

      toggleElementSelection: (id, exclusive) => {
        set((prev) =>
          produce(prev, (draft) => {
            if (prev.selection.elementIds.includes(id)) {
              if (exclusive) {
                if (prev.selection.elementIds.length > 1) {
                  draft.selection.elementIds = [id];
                } else {
                  draft.selection.elementIds = [];
                }
              } else {
                draft.selection.elementIds = prev.selection.elementIds.filter(
                  (eId) => eId !== id
                );
              }
            } else {
              if (exclusive) {
                draft.selection.elementIds = [];
              }
              draft.selection.elementIds.push(id);
            }
          })
        );
      },
    },

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

      unhideAll: () =>
        set((prev) =>
          produce(prev, (draft) => {
            draft.outliner.selfVisibility = {};
            draft.outliner.childrenVisibility = {};
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

      measure_distance: {
        state: { stage: "1", firstPointCandidate: null },
        setState: (value) =>
          set((prev) =>
            produce(prev, (draft) => {
              draft.tool.measure_distance.state = value;
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

export const IfcStoreContext = createContext<StoreApi<IfcState> | null>(null);

export const useIfcStore = <T>(selector: (state: IfcState) => T): T => {
  const store = useContext(IfcStoreContext)!;
  return useStore(store, selector);
};

const recalculateFilteredElements = (
  original: Record<number, Element>,
  elementTypes: string[],
  invert: boolean
): Record<number, Element> => {
  const rootElement = Object.values(original).find(
    (el) => el.parent_id === null
  );

  if (rootElement === undefined) {
    return {};
  }

  let newFilteredElements: Record<number, Element> = {};
  const searchStrings = elementTypes.map((searchString) =>
    searchString.toLowerCase()
  );

  const collect = (el: Element): boolean => {
    let result = false;

    if (invert) {
      result = true;

      searchStrings.forEach((searchString) => {
        if (!result) {
          return;
        }
        if (el.type.toLowerCase().includes(searchString)) {
          result = false;
        }
      });
    } else {
      searchStrings.forEach((searchString) => {
        if (result) {
          return;
        }
        if (el.type.toLowerCase().includes(searchString)) {
          result = true;
        }
      });
    }

    for (const childId of el.child_ids) {
      const childEl = original[childId];
      if (collect(childEl)) {
        result = true;
      }
    }

    if (result) {
      newFilteredElements[el.id] = el;
    }

    return result;
  };

  if (elementTypes.length > 0) {
    collect(rootElement);
  } else {
    newFilteredElements = original;
  }

  return newFilteredElements;
};
