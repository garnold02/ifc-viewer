import { useMemo, type PropsWithChildren } from "react";
import type { TreeNodeGeometryTransform } from "../../api/queries/tree/types";

export const ViewportUprightGroup = ({ children }: PropsWithChildren) => {
  // Rotate +90° around X axis
  const matrix = useMemo(
    () =>
      [
        1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      ] as TreeNodeGeometryTransform,
    []
  );

  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      {children}
    </group>
  );
};
