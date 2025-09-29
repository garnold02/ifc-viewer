import { OrbitControls } from "@react-three/drei";

export const IfcSceneCamera = () => {
  return <OrbitControls dampingFactor={0.25} makeDefault />;
};
