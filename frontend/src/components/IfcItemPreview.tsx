import { OrbitControls } from "@react-three/drei";
import { IfcCanvas } from "./IfcCanvas";
import { IfcSceneLight } from "./IfcSceneLight";
import type { TreeNodeGeometry } from "../api/queries/ifcTree";
import { IfcItemPreviewGeometry } from "./IfcItemPreviewGeometry";
import { ViewportUprightGroup } from "./ViewportUprightGroup";

type Props = {
  geometries: TreeNodeGeometry[];
};

export const IfcItemPreview = ({ geometries }: Props) => {
  return (
    <IfcCanvas style={{ width: "400px", height: "300px" }}>
      <ViewportUprightGroup>
        {geometries.map((geometry, i) => (
          <IfcItemPreviewGeometry key={i} geometry={geometry} />
        ))}
      </ViewportUprightGroup>
      <IfcSceneLight />
      <OrbitControls dampingFactor={0.5} makeDefault />
    </IfcCanvas>
  );
};
