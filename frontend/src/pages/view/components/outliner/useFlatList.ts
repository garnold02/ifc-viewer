import type { Element } from "@api/types/element";
import { useIfcStore } from "@stores/ifc/store";
import { useMemo } from "react";

export type FlatListItem = {
  level: number;
  element: Element;
};

export const useFlatList = () => {
  const filteredElements = useIfcStore((state) => state.filter.elements);
  const expansion = useIfcStore((state) => state.outliner.expansion);

  const list = useMemo(() => {
    const rootElement = Object.values(filteredElements).find(
      (element) => element.parent_id === null
    );

    if (rootElement === undefined) {
      return [];
    }

    const innerList: FlatListItem[] = [];
    const expand = (el: Element, level: number) => {
      innerList.push({
        level,
        element: el,
      });

      const expanded = el.id in expansion ? expansion[el.id] : false;
      if (!expanded) {
        return;
      }

      el.child_ids.forEach((childId) => {
        if (childId in filteredElements) {
          expand(filteredElements[childId], level + 1);
        }
      });
    };

    expand(rootElement, 0);
    return innerList;
  }, [filteredElements, expansion]);

  return list;
};
