import { produce } from "immer";
import { createContext, useContext } from "react";
import { create, useStore, type StoreApi } from "zustand";

export type OutlinerState = {
  nodeStates: OutlinerNodeState[];
  setNodeState: (
    id: number,
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
    setNodeState: (id, prod) =>
      set((prev) =>
        produce(prev, (draft) => {
          let before = prev.nodeStates.find((ns) => ns.id === id);
          if (before !== undefined) {
            draft.nodeStates.splice(prev.nodeStates.indexOf(before), 1);
          } else {
            before = {
              id,
              expanded: false,
              showSelf: true,
              showChildren: true,
            };
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
