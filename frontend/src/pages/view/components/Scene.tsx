import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useGetIfcRootNode } from "../../../api/queries/ifcRootNode";
import { useIfcContext } from "../../../contexts/ifc";
import { SceneNode } from "./SceneNode";
import { IfcTransformGroup } from "../../../components/IfcTransformGroup";

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
      <SceneNode node={rootNode} highlight={false} />
    </IfcTransformGroup>
  );
};
