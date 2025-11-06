import type { ElementGeometry } from "@api/types/elementGeometry";

export type Element = {
  id: number;
  type: string;
  name: string | null;
  geometry: ElementGeometry | null;
  parent_id: number | null;
  child_ids: number[];
};
