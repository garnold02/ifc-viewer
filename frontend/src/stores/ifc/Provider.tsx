import { useMemo, type PropsWithChildren } from "react";
import { createIfcStore, IfcStoreContext } from "./store";
import type { Element } from "../../api/types/file/element";

type Props = PropsWithChildren<{
  fileId: number;
  elements: Record<number, Element>;
}>;

export const IfcStoreProvider = ({ fileId, elements, children }: Props) => {
  const store = useMemo(() => createIfcStore(fileId, elements), []);
  return (
    <IfcStoreContext.Provider value={store}>
      {children}
    </IfcStoreContext.Provider>
  );
};
