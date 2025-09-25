import type { TreeNode } from "../../api/queries/tree/types";
import { ViewportNode } from "./ViewportNode";
import { ViewportUprightGroup } from "./ViewportUprightGroup";

type Props = {
  rootNode: TreeNode | null;
};

export const ViewportScene = ({ rootNode }: Props) => {
  if (rootNode === null) {
    return null;
  }
  return (
    <ViewportUprightGroup>
      <ViewportNode node={rootNode} highlight={false} />
    </ViewportUprightGroup>
  );
};
