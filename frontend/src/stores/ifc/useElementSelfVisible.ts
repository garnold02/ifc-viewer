import { useIfcStore } from "@stores/ifc/store";
import { defaultVisibilityOf } from "@utils/visibility";
import { useMemo } from "react";

export const useElementSelfVisible = (id: number) => {
  const elements = useIfcStore((state) => state.elements);
  const selfVisibility = useIfcStore((state) => state.outliner.selfVisibility);

  const value = useMemo(() => {
    if (id in selfVisibility) {
      return selfVisibility[id];
    } else {
      return defaultVisibilityOf(elements[id].type);
    }
  }, [elements, id, selfVisibility]);

  return value;
};
