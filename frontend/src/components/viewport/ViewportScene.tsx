import { useMemo } from "react";
import type {
  TreeNode,
  TreeNodeGeometryTransform,
} from "../../api/queries/tree/types";
import { ViewportNode } from "./ViewportNode";

type Props = {
  rootNode: TreeNode | null;
};

export const ViewportScene = ({ rootNode }: Props) => {
  // Rotate +90° around X axis
  const matrix = useMemo(
    () =>
      [
        1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      ] as TreeNodeGeometryTransform,
    []
  );

  if (rootNode === null) {
    return null;
  }

  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      <ViewportNode node={rootNode} highlight={false} />
    </group>
  );
};
