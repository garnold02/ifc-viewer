import { Grid } from "@react-three/drei";

export const IfcSceneGrid = () => {
  return (
    <Grid
      cellSize={1}
      sectionSize={10}
      fadeDistance={500}
      fadeStrength={10}
      followCamera
      infiniteGrid
    />
  );
};
