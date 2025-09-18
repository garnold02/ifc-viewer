import { useMemo } from "react";
import type {
  EntityGeometry,
  EntityTransform,
} from "../../api/queries/geometry/types";
import { ViewportGeometry } from "./ViewportGeometry";

type Props = {
  values: { id: number; node: EntityGeometry }[];
};

export const ViewportScene = ({ values }: Props) => {
  // Rotate +90° around X axis
  const matrix = useMemo(
    () => [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1] as EntityTransform,
    []
  );

  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      {values.map(({ id, node }) => (
        <ViewportGeometry key={id} id={id} node={node} />
      ))}
      <ambientLight color={[1, 1, 1]} intensity={0.25} />
      <directionalLight position={[1, 2, 3]} color={[1, 1, 1]} />
    </group>
  );
};
