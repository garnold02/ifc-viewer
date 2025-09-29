import { useMemo, type PropsWithChildren } from "react";
import { createOutlinerStore, OutlinerStoreContext } from "./store";

export const OutlinerStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => createOutlinerStore(), []);
  return (
    <OutlinerStoreContext.Provider value={store}>
      {children}
    </OutlinerStoreContext.Provider>
  );
};
