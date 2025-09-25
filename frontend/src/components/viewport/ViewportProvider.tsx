import { useMemo, type PropsWithChildren } from "react";
import { createViewportStore, ViewportContext } from "./store";

export const ViewportProvider = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => createViewportStore(), []);
  return (
    <ViewportContext.Provider value={store}>
      {children}
    </ViewportContext.Provider>
  );
};
