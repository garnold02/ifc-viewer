import { useIfcStore } from "@stores/ifc/store";
import { useCallback } from "react";

export const useElementSetExpanded = (id: number) => {
  const setExpanded = useIfcStore((state) => state.outliner.setExpanded);
  const callback = useCallback(
    (value: boolean) => setExpanded(id, value),
    [id, setExpanded]
  );

  return callback;
};
