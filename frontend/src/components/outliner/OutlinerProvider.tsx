import { useMemo, type PropsWithChildren } from "react";
import { createOutlinerStore, OutlinerContext } from "./store";

export const OutlinerProvider = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => createOutlinerStore(), []);
  return (
    <OutlinerContext.Provider value={store}>
      {children}
    </OutlinerContext.Provider>
  );
};
