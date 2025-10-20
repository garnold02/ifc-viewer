import { useCallback } from "react";

import { useIfcStore } from "./store";

export const useToggleSelectElement = (id: number) => {
  const elements = useIfcStore((state) => state.elements);
  const selectedElement = useIfcStore((state) => state.selectedElement);
  const setSelectedItem = useIfcStore((state) => state.setSelectedElement);
  const callback = useCallback(
    () => setSelectedItem(selectedElement?.id === id ? null : elements[id]),
    [elements, id, selectedElement?.id, setSelectedItem]
  );

  return callback;
};
