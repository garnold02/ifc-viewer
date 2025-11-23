import type { Element } from "@api/types/element";
import {
  createIfcStore,
  type IfcState,
  IfcStoreContext,
  useIfcStore,
} from "@stores/ifc/store";
import { act, renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import type { StoreApi, UseBoundStore } from "zustand";

test("IfcStore filter.setElementTypes should work", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const elements1 = useCustomIfcStore(
    ifcStore,
    (state) => state.filter.elements
  );

  expect(elements1).toStrictEqual(ELEMENTS);

  const setElementTypes = useCustomIfcStore(
    ifcStore,
    (state) => state.filter.setElementTypes
  );

  act(() => {
    setElementTypes(["IfcSomeRandomStuff"]);
  });

  const elements2 = useCustomIfcStore(
    ifcStore,
    (state) => state.filter.elements
  );

  expect(elements2).toStrictEqual({});
});

test("IfcStore filter.setInvert should work", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const elements1 = useCustomIfcStore(
    ifcStore,
    (state) => state.filter.elements
  );

  expect(elements1).toStrictEqual(ELEMENTS);

  const setElementTypes = useCustomIfcStore(
    ifcStore,
    (state) => state.filter.setElementTypes
  );

  act(() => {
    setElementTypes(["IfcSomeRandomStuff"]);
  });

  const setInvert = useCustomIfcStore(
    ifcStore,
    (state) => state.filter.setInvert
  );

  act(() => {
    setInvert(true);
  });

  const elements2 = useCustomIfcStore(
    ifcStore,
    (state) => state.filter.elements
  );

  expect(elements2).toStrictEqual(ELEMENTS);
});

test("IfcStore selection.selectElement should work (non exclusive)", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const elementIds1 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds1).toStrictEqual([]);

  const selectElement = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.selectElement
  );

  act(() => {
    selectElement(456, false);
    selectElement(457, false);
  });

  const elementIds2 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds2).toStrictEqual([456, 457]);
});

test("IfcStore selection.selectElement should work (exclusive)", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const elementIds1 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds1).toStrictEqual([]);

  const selectElement = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.selectElement
  );

  act(() => {
    selectElement(456, true);
    selectElement(457, true);
  });

  const elementIds2 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds2).toStrictEqual([457]);
});

test("IfcStore selection.deselectElement should work", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const setElementIds = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.setElementIds
  );

  act(() => {
    setElementIds([456, 457]);
  });

  const deselectElement = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.deselectElement
  );

  act(() => {
    deselectElement(456);
  });

  const elementIds2 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds2).toStrictEqual([457]);
});

test("IfcStore selection.toggleElementSelection should work (non exclusive)", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const elementIds1 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds1).toStrictEqual([]);

  const toggleElementSelection = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.toggleElementSelection
  );

  act(() => {
    toggleElementSelection(456, false);
    toggleElementSelection(457, false);
  });

  const elementIds2 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds2).toStrictEqual([456, 457]);

  act(() => {
    toggleElementSelection(456, false);
  });

  const elementIds3 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds3).toStrictEqual([457]);
});

test("IfcStore selection.toggleElementSelection should work (exclusive)", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const elementIds1 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds1).toStrictEqual([]);

  const toggleElementSelection = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.toggleElementSelection
  );

  act(() => {
    toggleElementSelection(456, true);
    toggleElementSelection(457, true);
  });

  const elementIds2 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds2).toStrictEqual([457]);

  act(() => {
    toggleElementSelection(457, true);
  });

  const elementIds3 = useCustomIfcStore(
    ifcStore,
    (state) => state.selection.elementIds
  );

  expect(elementIds3).toStrictEqual([]);
});

test("IfcStore outliner.unhideAll should work", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const setSelfVisibile = useCustomIfcStore(
    ifcStore,
    (state) => state.outliner.setSelfVisible
  );

  const setChildrenVisibile = useCustomIfcStore(
    ifcStore,
    (state) => state.outliner.setChildrenVisible
  );

  act(() => {
    setSelfVisibile(456, false);
    setChildrenVisibile(456, false);
  });

  const unhideAll = useCustomIfcStore(
    ifcStore,
    (state) => state.outliner.unhideAll
  );

  act(() => {
    unhideAll();
  });

  const selfVisibility = useCustomIfcStore(
    ifcStore,
    (state) => state.outliner.selfVisibility
  );

  const childrenVisibility = useCustomIfcStore(
    ifcStore,
    (state) => state.outliner.childrenVisibility
  );

  expect(selfVisibility).toStrictEqual({});
  expect(childrenVisibility).toStrictEqual({});
});

test("IfcStore details.pushElement should work", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const pushElements = useCustomIfcStore(
    ifcStore,
    (state) => state.details.pushElement
  );

  act(() => {
    pushElements(456);
    pushElements(457);
  });

  const elementStack = useCustomIfcStore(
    ifcStore,
    (state) => state.details.elementStack
  );

  expect(elementStack).toStrictEqual([456, 457]);
});

test("IfcStore details.popElement should work", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const pushElements = useCustomIfcStore(
    ifcStore,
    (state) => state.details.pushElement
  );

  act(() => {
    pushElements(456);
    pushElements(457);
  });

  const popElement = useCustomIfcStore(
    ifcStore,
    (state) => state.details.popElement
  );

  act(() => {
    popElement();
  });

  const elementStack = useCustomIfcStore(
    ifcStore,
    (state) => state.details.elementStack
  );

  expect(elementStack).toStrictEqual([456]);
});

test("IfcStore details.clearElementStack should work", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const pushElements = useCustomIfcStore(
    ifcStore,
    (state) => state.details.pushElement
  );

  act(() => {
    pushElements(456);
    pushElements(457);
  });

  const clearElementStack = useCustomIfcStore(
    ifcStore,
    (state) => state.details.clearElementStack
  );

  act(() => {
    clearElementStack();
  });

  const elementStack = useCustomIfcStore(
    ifcStore,
    (state) => state.details.elementStack
  );

  expect(elementStack).toStrictEqual([]);
});

test("IfcStore details.revertElementStack should work", () => {
  const ifcStore = createIfcStore(123, ELEMENTS);

  const pushElements = useCustomIfcStore(
    ifcStore,
    (state) => state.details.pushElement
  );

  act(() => {
    pushElements(456);
    pushElements(457);
  });

  const revertElementStack = useCustomIfcStore(
    ifcStore,
    (state) => state.details.revertElementStack
  );

  act(() => {
    revertElementStack(0);
  });

  const elementStack = useCustomIfcStore(
    ifcStore,
    (state) => state.details.elementStack
  );

  expect(elementStack).toStrictEqual([456]);
});

const useCustomIfcStore = <T,>(
  ifcStore: UseBoundStore<StoreApi<IfcState>>,
  selector: (state: IfcState) => T
): T => {
  const {
    result: { current },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = renderHook(() => useIfcStore(selector), {
    wrapper: (props) => (
      <IfcStoreContext.Provider value={ifcStore}>
        {props.children}
      </IfcStoreContext.Provider>
    ),
  });

  return current;
};

const ELEMENTS: Record<number, Element> = {
  456: {
    id: 456,
    type: "IfcProject",
    name: "Project name",
    geometry: null,
    parent_id: null,
    child_ids: [457],
  },
  457: {
    id: 457,
    type: "IfcSite",
    name: "Site name",
    geometry: null,
    parent_id: 456,
    child_ids: [],
  },
};
