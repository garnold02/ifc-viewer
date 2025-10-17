import type { Element } from "@api/types/file/element";
import { Typography } from "@mui/material";
import { useIfcStore } from "@stores/ifc/store";
import { pascalToSentenceCase } from "@utils/casing";
import { useCallback, useMemo } from "react";

type Props = {
  element: Element;
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
