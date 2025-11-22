import {
  createPropertyStore,
  PropertyStoreContext,
  usePropertyStore,
} from "@stores/property/store";
import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

test("PropertyStore expansion logic should work", () => {
  const store = createPropertyStore();

  const {
    result: { current: expansionStates1 },
  } = renderHook(() => usePropertyStore((state) => state.expansionStates), {
    wrapper: (props) => (
      <PropertyStoreContext.Provider value={store}>
        {props.children}
      </PropertyStoreContext.Provider>
    ),
  });

  const {
    result: { current: setExpanded },
  } = renderHook(() => usePropertyStore((state) => state.setExpanded), {
    wrapper: (props) => (
      <PropertyStoreContext.Provider value={store}>
        {props.children}
      </PropertyStoreContext.Provider>
    ),
  });

  expect(expansionStates1).toStrictEqual({});

  setExpanded("foo/bar/baz", true);

  const {
    result: { current: expansionStates2 },
  } = renderHook(() => usePropertyStore((state) => state.expansionStates), {
    wrapper: (props) => (
      <PropertyStoreContext.Provider value={store}>
        {props.children}
      </PropertyStoreContext.Provider>
    ),
  });

  expect(expansionStates2).toStrictEqual({ "foo/bar/baz": true });

  setExpanded("foo/bar/baz", false);

  const {
    result: { current: expansionStates3 },
  } = renderHook(() => usePropertyStore((state) => state.expansionStates), {
    wrapper: (props) => (
      <PropertyStoreContext.Provider value={store}>
        {props.children}
      </PropertyStoreContext.Provider>
    ),
  });

  expect(expansionStates3).toStrictEqual({ "foo/bar/baz": false });
});
