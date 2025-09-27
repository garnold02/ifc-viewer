import type { OutlinerNodeState } from "../stores/outlinerStore";
import { defaultVisibilityOf } from "./visibility";

export const defaultOutlinerNodeState = (
  id: number,
  type: string
): OutlinerNodeState => ({
  id,
  expanded: false,
  showSelf: defaultVisibilityOf(type),
  showChildren: true,
});
