import { useMemo, type PropsWithChildren } from "react";
import { createToolStore, ToolStoreContext } from "./toolStore";

export const ToolStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => createToolStore(), []);
  return (
    <ToolStoreContext.Provider value={store}>
      {children}
    </ToolStoreContext.Provider>
  );
};
