import { useIfcStore } from "@stores/ifc/store";
import { useCallback } from "react";

export const useElementSetSelfVisible = (id: number) => {
  const setSelfVisible = useIfcStore((state) => state.outliner.setSelfVisible);
  const callback = useCallback(
    (value: boolean) => setSelfVisible(id, value),
    [id, setSelfVisible]
  );

  return callback;
};
