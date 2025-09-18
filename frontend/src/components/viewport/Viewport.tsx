import { Canvas } from "@react-three/fiber";
import { FlyControls } from "@react-three/drei";
import { useGetGeometryList } from "../../api/queries/geometry/useGetGeometryList";
import { ViewportScene } from "./ViewportScene";
import { LinearProgress, Stack } from "@mui/material";
import { useGetGeometryNodes } from "../../api/queries/geometry/useGetGeometryNode";
import { useMemo } from "react";

export const Viewport = () => {
  const { data: geometryIds } = useGetGeometryList();
  const results = useGetGeometryNodes(geometryIds ?? []);

  const progressVariant = useMemo(
    () => (geometryIds === undefined ? "query" : "determinate"),
    [geometryIds]
  );

  const progressValue = useMemo(
    () =>
      (results.reduce(
        (a, result) => a + (result.data !== undefined ? 1 : 0),
        0
      ) *
        100) /
      results.length,
    [results]
  );

  const values = useMemo(() => {
    if (
      geometryIds === undefined ||
      results.some((result) => result.data === undefined)
    ) {
      return null;
    }
    return results.map((result, i) => ({
      id: geometryIds[i],
      node: result.data!,
    }));
  }, [geometryIds, results]);

  return (
    <Stack>
      {values === null ? (
        <LinearProgress variant={progressVariant} value={progressValue} />
      ) : null}
      <Canvas
        style={{
          background: BACKGROUND,
        }}
      >
        {values !== null ? <ViewportScene values={values} /> : null}
        <FlyControls
          autoForward={false}
          dragToLook={true}
          movementSpeed={3}
          rollSpeed={1}
          makeDefault
        />
      </Canvas>
    </Stack>
  );
};

const BACKGROUND = "linear-gradient(0, rgba(0, 0, 0, 1) 0%, #1b3196 100%)";
