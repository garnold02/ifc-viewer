import { PivotControls } from "@react-three/drei";
import { useToolStore } from "../../../../stores/tool/store";
import { Color, Matrix4 } from "three";

export const ClipTool = () => {
  const toolContent = useToolStore((state) => state.content);
  const setToolContent = useToolStore((state) => state.setContent);

  if (toolContent?.type !== "clip") {
    return null;
  }

  return (
    <>
      <group matrixAutoUpdate={false} matrix={toolContent.matrix}>
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
        matrix={toolContent.matrix}
        onDrag={(matrix) =>
          setToolContent({ type: "clip", matrix: new Matrix4().copy(matrix) })
        }
        scale={80}
        disableScaling
        fixed
      />
    </>
  );
};
