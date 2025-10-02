import { Chip, LinearProgress } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { useIfcStore } from "../../../stores/ifc/store";
import { useGetIfcAttributes } from "../../../api/queries/ifcAttributes";
import { useCallback, useMemo } from "react";

type Props = {
  id: number;
  stackPosition?: number;
};

export const ElementReference = ({ id, stackPosition }: Props) => {
  const fileId = useIfcStore((state) => state.fileId);
  const { data: attributes } = useGetIfcAttributes(fileId, id);

  const pushDetailsElement = useIfcStore((state) => state.details.pushElement);
  const revertDetailsElementStack = useIfcStore(
    (state) => state.details.revertElementStack
  );

  const onClick = useCallback(() => {
    if (stackPosition !== undefined) {
      revertDetailsElementStack(stackPosition);
    } else {
      pushDetailsElement(id);
    }
  }, [stackPosition, revertDetailsElementStack, pushDetailsElement]);

  const type = useMemo(() => {
    if (attributes === undefined) {
      return null;
    }

    const attribute = attributes.find((attribute) => attribute.name === "type");

    if (
      attribute === undefined ||
      attribute.value.type !== "value" ||
      typeof attribute.value.value !== "string"
    ) {
      return null;
    }

    return attribute.value.value;
  }, [attributes]);

  if (attributes === undefined) {
    return <LinearProgress />;
  }

  if (type === null) {
    return null;
  }

  return (
    <Chip
      size="small"
      icon={<LinkIcon fontSize="small" />}
      label={`${type}#${id}`}
      onClick={onClick}
      sx={{ userSelect: "none" }}
    />
  );
};
