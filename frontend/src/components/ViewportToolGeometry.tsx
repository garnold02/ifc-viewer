import { useToolStore } from "../stores/toolStore";
import { ViewportToolGeometryMeasureArea } from "./ViewportToolGeometryMeasureArea";
import { ViewportToolGeometryMeasureLength } from "./ViewportToolGeometryMeasureLength";

export const ViewportToolGeometry = () => {
  const activeTool = useToolStore((state) => state.activeTool);
  switch (activeTool?.type) {
    case undefined:
      return null;

    case "select":
      return null;

    case "measure_length":
      return <ViewportToolGeometryMeasureLength tool={activeTool} />;

    case "measure_area":
      return <ViewportToolGeometryMeasureArea tool={activeTool} />;

    case "measure_volume":
      return null;
  }
};
