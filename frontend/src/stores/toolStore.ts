import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Vector3 } from "three";
import type { TreeNodeGeometryTransform } from "../api/queries/ifcTree";
import { create, useStore, type StoreApi } from "zustand";
import { produce } from "immer";

export type ToolState = {
  activeTool: ActiveTool | null;
  setActiveTool: Dispatch<SetStateAction<ActiveTool | null>>;
};

export type ActiveTool =
  | { type: "select" }
  | { type: "measure_length"; points: Vector3[] }
  | { type: "measure_area"; faces: AreaMeasureFace[] }
  | { type: "measure_volume" };

export type ToolName = ActiveTool["type"];

export type AreaMeasureFace = {
  nodeId: number;
  faceIndex: number;
  transform: TreeNodeGeometryTransform;
  a: Vector3;
  b: Vector3;
  c: Vector3;
};

export const createToolStore = () =>
  create<ToolState>((set) => ({
    activeTool: createDefaultActiveTool(null),
    setActiveTool: (value) =>
      set((prev) =>
        produce(prev, (draft) => {
          draft.activeTool =
            typeof value === "function" ? value(prev.activeTool) : value;
        })
      ),
  }));

export const ToolStoreContext = createContext<StoreApi<ToolState> | null>(null);

export const useToolStore = <T>(selector: (state: ToolState) => T): T => {
  const store = useContext(ToolStoreContext)!;
  return useStore(store, selector);
};

export const createDefaultActiveTool = (
  toolName: ToolName | null
): ActiveTool | null => {
  switch (toolName) {
    case null:
      return null;

    case "select":
      return { type: "select" };

    case "measure_length":
      return { type: "measure_length", points: [] };

    case "measure_area":
      return { type: "measure_area", faces: [] };

    case "measure_volume":
      return { type: "measure_volume" };
  }
};
