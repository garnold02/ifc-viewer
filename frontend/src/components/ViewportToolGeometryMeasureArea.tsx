import { Typography, useTheme } from "@mui/material";
import type { ActiveTool, AreaMeasureFace } from "../stores/toolStore";
import { Html, Line } from "@react-three/drei";
import { IfcTransformGroup } from "./IfcTransformGroup";
import { useMemo } from "react";
import { Matrix4, Vector3 } from "three";

type Props = {
  tool: Extract<ActiveTool, { type: "measure_area" }>;
};

export const ViewportToolGeometryMeasureArea = ({ tool }: Props) => {
  const theme = useTheme();
  const center = useMemo(() => {
    const accum = new Vector3(0, 0, 0);
    for (const face of tool.faces) {
      const bary = new Vector3(0, 0, 0);
      bary.add(face.a);
      bary.add(face.b);
      bary.add(face.c);
      bary.divideScalar(3);
      bary.applyMatrix4(faceMatrix(face));
      accum.add(bary);
    }

    accum.divideScalar(tool.faces.length);
    return accum;
  }, [tool.faces]);

  const area = useMemo(() => {
    let accum = 0;
    for (const face of tool.faces) {
      const matrix = faceMatrix(face);
      const a = face.a.clone().applyMatrix4(matrix);
      const b = face.b.clone().applyMatrix4(matrix);
      const c = face.c.clone().applyMatrix4(matrix);
      const x = b.clone().sub(a);
      const y = c.clone().sub(a);
      const area = x.cross(y).length() / 2;
      accum += area;
    }
    return accum;
  }, [tool.faces]);

  return (
    <IfcTransformGroup>
      {tool.faces.map((face, i) => (
        <Line
          key={i}
          matrix={face.transform}
          matrixAutoUpdate={false}
          points={[face.a, face.b, face.c, face.a]}
          lineWidth={4}
          color={theme.palette.primary.main}
        />
      ))}
      {tool.faces.length > 0 ? (
        <Html position={center} center>
          <Typography
            color="white"
            fontWeight="bold"
            sx={{ userSelect: "none" }}
          >
            {`${Math.round(area * 100) / 100}m²`}
          </Typography>
        </Html>
      ) : null}
    </IfcTransformGroup>
  );
};

const faceMatrix = (face: AreaMeasureFace): Matrix4 =>
  new Matrix4(
    face.transform[0],
    face.transform[4],
    face.transform[8],
    face.transform[12],
    face.transform[1],
    face.transform[5],
    face.transform[9],
    face.transform[13],
    face.transform[2],
    face.transform[6],
    face.transform[10],
    face.transform[14],
    face.transform[3],
    face.transform[7],
    face.transform[11],
    face.transform[15]
  );
