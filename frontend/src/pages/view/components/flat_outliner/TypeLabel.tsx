import { useCallback } from "react";
import { Typography } from "@mui/material";
import { type IfcNodeFlat } from "../../../../types/ifc";
import { useOutlinerStore } from "../../../../stores/outliner/store";

type Props = {
  element: IfcNodeFlat;
};

export const TypeLabel = ({ element }: Props) => {
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useOutlinerStore(
    (state) => state.setSelectedNodeId
  );

  const onTypographyClick = useCallback(() => {
    setSelectedNodeId(selectedNodeId === element.id ? null : element.id);
  }, [element.id, selectedNodeId, setSelectedNodeId]);

  return (
    <Typography
      color={selectedNodeId === element.id ? "primary" : "textPrimary"}
      fontWeight={selectedNodeId === element.id ? "bold" : "normal"}
      sx={{ userSelect: "none" }}
      onClick={onTypographyClick}
      noWrap
    >
      {element.type}
    </Typography>
  );
};
