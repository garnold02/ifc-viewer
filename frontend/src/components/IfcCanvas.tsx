import { Canvas, type CanvasProps } from "@react-three/fiber";
import { type CSSProperties, useMemo } from "react";

export const IfcCanvas = ({ children, style, ...props }: CanvasProps) => {
  const calculatedStyle: CSSProperties = useMemo(
    () => ({
      background: "linear-gradient(0, rgba(0, 0, 0, 1) 0%, #1b3196 100%)",
      ...style,
    }),
    [style]
  );

  return (
    <Canvas style={calculatedStyle} {...props}>
      {children}
    </Canvas>
  );
};
