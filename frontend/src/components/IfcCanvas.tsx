import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { type CSSProperties, useMemo } from "react";

export const IfcCanvas = ({ children, style, ...props }: CanvasProps) => {
  const calculatedStyle: CSSProperties = useMemo(
    () => ({
      background: "linear-gradient(0, #2f2f2f 0%, #3f3f3f 100%)",
      ...style,
    }),
    [style]
  );

  return (
    <Canvas style={calculatedStyle} {...props}>
      <GizmoHelper alignment="top-right">
        <GizmoViewport />
      </GizmoHelper>
      {children}
    </Canvas>
  );
};
