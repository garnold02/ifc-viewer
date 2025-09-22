import { useMemo, type PropsWithChildren } from "react";
import { createToolbarStore, ToolbarContext } from "./store";

export const ToolbarProvider = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => createToolbarStore(), []);
  return (
    <ToolbarContext.Provider value={store}>{children}</ToolbarContext.Provider>
  );
};
