import { useMemo, type PropsWithChildren } from "react";
import { createIfcStore, IfcStoreContext } from "./store";
import type { IfcElement } from "../../types/ifc";

type Props = PropsWithChildren<{
  fileId: number;
  elements: Record<number, IfcElement>;
}>;

export const IfcStoreProvider = ({ fileId, elements, children }: Props) => {
  const store = useMemo(() => createIfcStore(fileId, elements), []);
  return (
    <IfcStoreContext.Provider value={store}>
      {children}
    </IfcStoreContext.Provider>
  );
};
