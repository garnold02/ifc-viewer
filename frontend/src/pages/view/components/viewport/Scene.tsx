import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Node } from "./Node";
import { useIfcContext } from "../../../../contexts/ifc";
import { useGetIfcRootNode } from "../../../../api/queries/ifcRootNode";
import { IfcTransformGroup } from "../../../../components/IfcTransformGroup";

export const Scene = () => {
  const { gl } = useThree();
  const { ifcId } = useIfcContext();
  const { data: rootNode } = useGetIfcRootNode(ifcId);

  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  if (rootNode === undefined) {
    return null;
  }

  return (
    <IfcTransformGroup>
      <Node node={rootNode} highlight={false} />
    </IfcTransformGroup>
  );
};
