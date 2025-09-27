import { Typography, useTheme } from "@mui/material";
import type { ActiveTool } from "../stores/toolStore";
import { Html, Line } from "@react-three/drei";
import { useMemo } from "react";
import { Vector3 } from "three";

type Props = {
  tool: Extract<ActiveTool, { type: "measure_length" }>;
};

export const ViewportToolGeometryMeasureLength = ({ tool }: Props) => {
  const theme = useTheme();
  const center = useMemo(
    () =>
      tool.points.length > 0
        ? tool.points
            .reduce((a, b) => new Vector3().addVectors(a, b))
            .divide(
              new Vector3(
                tool.points.length,
                tool.points.length,
                tool.points.length
              )
            )
        : null,
    [tool.points]
  );

  const distance = useMemo(() => {
    let total = 0;

    for (let i = 0; i < tool.points.length; ++i) {
      const a = tool.points[i];
      const b = tool.points[i + 1];

      if (b === undefined) {
        break;
      }

      total += a.distanceTo(b);
    }

    return total;
  }, [tool.points]);

  return tool.points.length > 1 ? (
    <>
      <Line
        points={tool.points}
        lineWidth={4}
        color={theme.palette.primary.main}
      />
      {center !== null ? (
        <Html position={center} center>
          <Typography
            color="white"
            fontWeight="bold"
            sx={{ userSelect: "none" }}
          >
            {`${Math.round(distance * 100) / 100}m`}
          </Typography>
        </Html>
      ) : null}
    </>
  ) : null;
};
