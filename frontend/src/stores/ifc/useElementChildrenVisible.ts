import { useIfcStore } from "@stores/ifc/store";
import { useMemo } from "react";

export const useElementChildrenVisible = (id: number) => {
  const childrenVisibility = useIfcStore(
    (state) => state.outliner.childrenVisibility
  );

  const value = useMemo(() => {
    if (id in childrenVisibility) {
      return childrenVisibility[id];
    } else {
      return true;
    }
  }, [childrenVisibility, id]);

  return value;
};
