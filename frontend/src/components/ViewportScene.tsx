import type { IfcNode } from "../types/ifc";
import { ViewportNode } from "./ViewportNode";
import { ViewportUprightGroup } from "./ViewportUprightGroup";

type Props = {
  rootNode: IfcNode | null;
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
