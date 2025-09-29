import { useMemo, type PropsWithChildren } from "react";
import { Matrix4 } from "three";

export const ViewportUprightGroup = ({ children }: PropsWithChildren) => {
  // Rotate -90° around X axis
  const matrix = useMemo(() => new Matrix4().makeRotationX(-Math.PI / 2), []);
  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      {children}
    </group>
  );
};
