import { useCallback, useMemo } from "react";
import { Typography } from "@mui/material";
import { type IfcElement } from "../../../../types/ifc";
import { useIfcStore } from "../../../../stores/ifc/store";
import { pascalToSentenceCase } from "../../../../utils/casing";

type Props = {
  element: IfcElement;
};

export const TypeLabel = ({ element }: Props) => {
  const selectedElement = useIfcStore((state) => state.selectedElement);
  const setSelectedElement = useIfcStore((state) => state.setSelectedElement);

  const selected = useMemo(
    () => selectedElement === element,
    [selectedElement, element]
  );

  const onTypographyClick = useCallback(() => {
    setSelectedElement(selectedElement === element ? null : element);
  }, [setSelectedElement, selectedElement, element]);

  const text = useMemo(
    () => pascalToSentenceCase(element.type),
    [element.type]
  );

  return (
    <Typography
      color={selected ? "primary" : "textPrimary"}
      fontWeight={selected ? "bold" : "normal"}
      sx={{ userSelect: "none" }}
      onClick={onTypographyClick}
      noWrap
    >
      {text}
    </Typography>
  );
};
