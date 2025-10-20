import { useIfcStore } from "@stores/ifc/store";
import { useCallback } from "react";

export const useElementSetChildrenVisible = (id: number) => {
  const setChildrenVisible = useIfcStore(
    (state) => state.outliner.setChildrenVisible
  );

  const callback = useCallback(
    (value: boolean) => setChildrenVisible(id, value),
    [id, setChildrenVisible]
  );

  return callback;
};
