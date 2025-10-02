import { Chip, LinearProgress } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { useIfcStore } from "../../../../stores/ifc/store";
import { useGetIfcAttributes } from "../../../../api/queries/ifcAttributes";
import { useCallback, useMemo } from "react";

type Props = {
  id: number;
};

export const ElementReference = ({ id }: Props) => {
  const fileId = useIfcStore((state) => state.fileId);
  const { data: attributes } = useGetIfcAttributes(fileId, id);

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

  const onClick = useCallback(() => {}, []);

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
