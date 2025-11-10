import { Typography } from "@mui/material";
import { MEASUREMENT_COLOR } from "@pages/view/components/viewport/constants";
import { Html, Line } from "@react-three/drei";
import { useIfcStore } from "@stores/ifc/store";
import { Vector3 } from "three";

export const MeasureDistanceTool = () => {
  const currentTool = useIfcStore((state) => state.tool.current);
  const state = useIfcStore((state) => state.tool.measure_distance.state);

  if (currentTool !== "measure_length") {
    return null;
  }

  return (
    <>
      {state.stage === "1" && state.firstPointCandidate !== null ? (
        <sprite position={state.firstPointCandidate} scale={0.02}>
          <spriteMaterial
            color={MEASUREMENT_COLOR}
            depthTest={false}
            sizeAttenuation={false}
          />
        </sprite>
      ) : null}
      {state.stage === "2" ? (
        <>
          <sprite position={state.firstPoint} scale={0.02}>
            <spriteMaterial
              color={MEASUREMENT_COLOR}
              depthTest={false}
              sizeAttenuation={false}
            />
          </sprite>
          {state.secondPointCandidate !== null ? (
            <>
              <sprite position={state.secondPointCandidate} scale={0.02}>
                <spriteMaterial
                  color={MEASUREMENT_COLOR}
                  depthTest={false}
                  sizeAttenuation={false}
                />
              </sprite>
              <Line
                points={[state.firstPoint, state.secondPointCandidate]}
                color={MEASUREMENT_COLOR}
                lineWidth={4}
                depthTest={false}
              />
              <Html
                position={new Vector3()
                  .copy(state.firstPoint)
                  .add(state.secondPointCandidate)
                  .divideScalar(2.0)}
                center
              >
                <Typography
                  color="white"
                  fontWeight="bold"
                  sx={{ userSelect: "none" }}
                  noWrap
                >
                  {`${Math.round(state.firstPoint.distanceTo(state.secondPointCandidate) * 1000) / 1000} m`}
                </Typography>
              </Html>
            </>
          ) : null}
        </>
      ) : null}
      {state.stage === "3" ? (
        <>
          <sprite position={state.firstPoint} scale={0.02}>
            <spriteMaterial
              color={MEASUREMENT_COLOR}
              depthTest={false}
              sizeAttenuation={false}
            />
          </sprite>
          <sprite position={state.secondPoint} scale={0.02}>
            <spriteMaterial
              color={MEASUREMENT_COLOR}
              depthTest={false}
              sizeAttenuation={false}
            />
          </sprite>
          <Line
            points={[state.firstPoint, state.secondPoint]}
            color={MEASUREMENT_COLOR}
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
