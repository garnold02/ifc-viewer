import { PivotControls } from "@react-three/drei";
import { useToolStore } from "../../../../stores/tool/store";
import { Color } from "three";

export const ClipTool = () => {
  const currentToolType = useToolStore((state) => state.current);
  const matrix = useToolStore((state) => state.clipState.matrix);
  const setMatrix = useToolStore((state) => state.setClipMatrix);

  if (currentToolType !== "clip") {
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
