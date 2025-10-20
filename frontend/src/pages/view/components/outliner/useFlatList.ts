import type { Element } from "@api/types/file/element";
import { useIfcStore } from "@stores/ifc/store";
import { useMemo } from "react";

export type FlatListItem = {
  level: number;
  element: Element;
};

export const useFlatList = () => {
  const elements = useIfcStore((state) => state.elements);
  const expansion = useIfcStore((state) => state.outliner.expansion);

  const list = useMemo(() => {
    const rootElement = Object.values(elements).find(
      (element) => element.parent_id === null
    );

    if (rootElement === undefined) {
      return null;
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

      el.child_ids.forEach((childId) => expand(elements[childId], level + 1));
    };

    expand(rootElement, 0);
    return innerList;
  }, [elements, expansion]);

  return list;
};
