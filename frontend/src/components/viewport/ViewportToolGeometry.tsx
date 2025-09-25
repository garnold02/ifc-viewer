import { useToolbarStore } from "../toolbar/store";
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
      return null;

    case "measure_volume":
      return null;
  }
};
