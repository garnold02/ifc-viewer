import { useGetFileElementSignature } from "@api/hooks/file/element/signature";
import LinkIcon from "@mui/icons-material/Link";
import { Chip, LinearProgress } from "@mui/material";
import { useIfcStore } from "@stores/ifc/store";
import { useCallback } from "react";

type Props = {
  id: number;
  stackPosition?: number;
};

export const ElementReference = ({ id, stackPosition }: Props) => {
  const fileId = useIfcStore((state) => state.fileId);
  const { data: signature } = useGetFileElementSignature(fileId, id);

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
  }, [id, stackPosition, revertDetailsElementStack, pushDetailsElement]);

  if (signature === undefined) {
    return <LinearProgress />;
  }

  return (
    <Chip
      size="small"
      icon={<LinkIcon fontSize="small" />}
      label={`${signature.type}#${signature.id}`}
      onClick={onClick}
      sx={{ userSelect: "none" }}
    />
  );
};
