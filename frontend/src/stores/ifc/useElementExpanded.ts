import { useIfcStore } from "@stores/ifc/store";
import { useMemo } from "react";

export const useElementExpanded = (id: number) => {
  const expansion = useIfcStore((state) => state.outliner.expansion);
  const value = useMemo(() => {
    if (id in expansion) {
      return expansion[id];
    } else {
      return false;
    }
  }, [expansion, id]);

  return value;
};
