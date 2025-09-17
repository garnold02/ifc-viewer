import { produce } from "immer";
import { createContext, useContext } from "react";
import { create, useStore, type StoreApi } from "zustand";

export type OutlinerState = {
  expandedIds: number[];
  visibilityStates: { id: number; visible: boolean }[];
  expand: (id: number) => void;
  collapse: (id: number) => void;
  show: (id: number) => void;
  hide: (id: number) => void;
};

export const createOutlinerStore = () =>
  create<OutlinerState>((set) => ({
    expandedIds: [],
    visibilityStates: [],
    expand: (id) =>
      set((prev) =>
        produce(prev, (draft) => {
          if (!prev.expandedIds.includes(id)) {
            draft.expandedIds.push(id);
          }
        })
      ),
    collapse: (id) =>
      set((prev) =>
        produce(prev, (draft) => {
          if (prev.expandedIds.includes(id)) {
            draft.expandedIds.splice(prev.expandedIds.indexOf(id), 1);
          }
        })
      ),
    show: (id) =>
      set((prev) =>
        produce(prev, (draft) => {
          const vs = prev.visibilityStates.find((vs) => vs.id === id);
          if (vs !== undefined) {
            draft.visibilityStates.splice(prev.visibilityStates.indexOf(vs), 1);
          }
          draft.visibilityStates.push({ id, visible: true });
        })
      ),
    hide: (id) =>
      set((prev) =>
        produce(prev, (draft) => {
          const vs = prev.visibilityStates.find((vs) => vs.id === id);
          if (vs !== undefined) {
            draft.visibilityStates.splice(prev.visibilityStates.indexOf(vs), 1);
          }
          draft.visibilityStates.push({ id, visible: false });
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
