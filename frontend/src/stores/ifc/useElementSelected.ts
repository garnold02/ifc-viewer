import { useIfcStore } from "./store";

export const useElementSelected = (id: number) => {
  const selectedElement = useIfcStore((state) => state.selectedElement);
  return selectedElement?.id === id;
};
