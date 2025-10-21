import { useIfcStore } from "./store";

export const useElementSelected = (id: number) => {
  const selectedElementIds = useIfcStore((state) => state.selection.elementIds);
  return selectedElementIds.includes(id);
};
