import type { IfcNode } from "../types/ifc";
import { ViewportNode } from "./ViewportNode";
import { IfcTransformGroup } from "./IfcTransformGroup";

type Props = {
  rootNode: IfcNode | null;
};

export const ViewportScene = ({ rootNode }: Props) => {
  if (rootNode === null) {
    return null;
  }
  return (
    <IfcTransformGroup>
      <ViewportNode node={rootNode} highlight={false} />
    </IfcTransformGroup>
  );
};
