import { Typography, useTheme } from "@mui/material";
import { Html, Line } from "@react-three/drei";
import { useIfcStore } from "@stores/ifc/store";
import { Vector3 } from "three";

export const MeasureDistanceTool = () => {
  const currentTool = useIfcStore((state) => state.tool.current);
  const state = useIfcStore((state) => state.tool.measure_distance.state);

  const {
    palette: {
      primary: { main: color },
    },
  } = useTheme();

  if (currentTool !== "measure_length") {
    return null;
  }

  return (
    <>
      {state.firstPoint !== null ? (
        <sprite position={state.firstPoint} scale={0.02}>
          <spriteMaterial
            color={color}
            depthTest={false}
            sizeAttenuation={false}
          />
        </sprite>
      ) : null}
      {state.secondPoint !== null ? (
        <sprite position={state.secondPoint} scale={0.02}>
          <spriteMaterial
            color={color}
            depthTest={false}
            sizeAttenuation={false}
          />
        </sprite>
      ) : null}
      {state.firstPoint !== null && state.secondPoint !== null ? (
        <>
          <Line
            points={[state.firstPoint, state.secondPoint]}
            color={color}
            lineWidth={4}
            depthTest={false}
          />
          <Html
            position={new Vector3()
              .copy(state.firstPoint)
              .add(state.secondPoint)
              .divideScalar(2.0)}
            center
          >
            <Typography
              color="white"
              fontWeight="bold"
              sx={{ userSelect: "none" }}
              noWrap
            >
              {`${Math.round(state.firstPoint.distanceTo(state.secondPoint) * 1000) / 1000} m`}
            </Typography>
          </Html>
        </>
      ) : null}
    </>
  );
};
