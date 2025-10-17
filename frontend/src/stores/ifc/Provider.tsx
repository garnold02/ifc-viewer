import type { Element } from "@api/types/file/element";
import { createIfcStore, IfcStoreContext } from "@stores/ifc/store";
import { type PropsWithChildren, useMemo } from "react";

type Props = PropsWithChildren<{
  fileId: number;
  elements: Record<number, Element>;
}>;

export const IfcStoreProvider = ({ fileId, elements, children }: Props) => {
  const store = useMemo(
    () => createIfcStore(fileId, elements),
    [elements, fileId]
  );

  return (
    <IfcStoreContext.Provider value={store}>
      {children}
    </IfcStoreContext.Provider>
  );
};
