import type { Element } from "@api/types/file/element";
import {
  createIfcStore,
  type IfcState,
  IfcStoreContext,
} from "@stores/ifc/store";
import { type PropsWithChildren, useState } from "react";
import type { StoreApi, UseBoundStore } from "zustand";

type Props = PropsWithChildren<{
  fileId: number;
  elements: Record<number, Element>;
}>;

export const IfcStoreProvider = ({ fileId, elements, children }: Props) => {
  const [store] = useState<UseBoundStore<StoreApi<IfcState>>>(
    createIfcStore(fileId, elements)
  );

  return (
    <IfcStoreContext.Provider value={store}>
      {children}
    </IfcStoreContext.Provider>
  );
};
