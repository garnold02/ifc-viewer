import { produce } from "immer";
import { createContext, useContext } from "react";
import { create, useStore, type StoreApi } from "zustand";
import { defaultOutlinerNodeState } from "../../utils/outliner";

export type OutlinerState = {
  nodeStates: OutlinerNodeState[];
  setNodeState: (
    id: number,
    type: string,
    prod: (prev: OutlinerNodeState) => OutlinerNodeState
  ) => void;
};

export type OutlinerNodeState = {
  id: number;
  expanded: boolean;
  showSelf: boolean;
  showChildren: boolean;
};

export const createOutlinerStore = () =>
  create<OutlinerState>((set) => ({
    nodeStates: [],
    setNodeState: (id, type, prod) =>
      set((prev) =>
        produce(prev, (draft) => {
          let before = prev.nodeStates.find((ns) => ns.id === id);
          if (before !== undefined) {
            draft.nodeStates.splice(prev.nodeStates.indexOf(before), 1);
          } else {
            before = defaultOutlinerNodeState(id, type);
          }
          const after = prod(before);
          draft.nodeStates.push(after);
        })
      ),
  }));

export const OutlinerContext = createContext<StoreApi<OutlinerState> | null>(
  null
);

export const useOutlinerStore = <T>(
  selector: (state: OutlinerState) => T
): T => {
  const store = useContext(OutlinerContext)!;
  return useStore(store, selector);
};
