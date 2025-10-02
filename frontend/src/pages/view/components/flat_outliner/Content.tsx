import { LinearProgress } from "@mui/material";
import type { IfcNodeFlat } from "../../../../types/ifc";
import { useMemo } from "react";
import { Element } from "./Element";

type Props = {
  elements: Record<number, IfcNodeFlat> | null;
};

export const Content = ({ elements }: Props) => {
  const rootElement = useMemo(() => {
    if (elements === null) {
      return null;
    }
    return (
      Object.values(elements).find((element) => element.parent_id === null) ??
      null
    );
  }, [elements]);

  if (elements === null || rootElement === null) {
    return <LinearProgress />;
  }

  return <Element elements={elements} element={rootElement} />;
};
