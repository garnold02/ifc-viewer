import { useToolbarStore } from "../toolbar/store";
import { ViewportToolGeometryMeasureArea } from "./ViewportToolGeometryMeasureArea";
import { ViewportToolGeometryMeasureLength } from "./ViewportToolGeometryMeasureLength";

export const ViewportToolGeometry = () => {
  const toolState = useToolbarStore((state) => state.toolState);

  switch (toolState?.type) {
    case undefined:
      return null;

    case "select":
      return null;

    case "measure_length":
      return <ViewportToolGeometryMeasureLength tool={toolState} />;

    case "measure_area":
      return <ViewportToolGeometryMeasureArea tool={toolState} />;

    case "measure_volume":
      return null;
  }
};
