import { Gltf, OrbitControls } from "@react-three/drei";
import { IfcCanvas } from "./IfcCanvas";
import { IfcSceneLight } from "./IfcSceneLight";

type Props = {
  gltfUrl: string;
};

export const IfcItemPreview = ({ gltfUrl }: Props) => {
  return (
    <IfcCanvas style={{ width: "400px", height: "300px" }}>
      <Gltf src={gltfUrl} />
      <IfcSceneLight />
      <OrbitControls dampingFactor={0.5} makeDefault />
    </IfcCanvas>
  );
};
