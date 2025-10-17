import { PivotControls } from "@react-three/drei";
import { useIfcStore } from "@stores/ifc/store";
import { Color } from "three";

export const ClipTool = () => {
  const currentTool = useIfcStore((state) => state.tool.current);
  const matrix = useIfcStore((state) => state.tool.clip.matrix);
  const setMatrix = useIfcStore((state) => state.tool.clip.setMatrix);

  if (currentTool !== "clip") {
    return null;
  }

  return (
    <>
      <group matrixAutoUpdate={false} matrix={matrix}>
        <mesh scale={100}>
          <planeGeometry />
          <meshBasicMaterial
            color={new Color(0, 0.125, 0.5)}
            opacity={0.25}
            transparent
          />
        </mesh>
      </group>
      <PivotControls
        autoTransform={false}
        matrix={matrix}
        onDrag={(matrix) => setMatrix(matrix)}
        scale={80}
        disableScaling
        fixed
      />
    </>
  );
};
