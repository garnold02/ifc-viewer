import { useTranslation } from "react-i18next";
import { PanelHead } from "../PanelHead";
import { useGetIfcAttributes } from "../../../../api/queries/ifcAttributes";
import { useIfcContext } from "../../../../contexts/ifc";
import { useMemo } from "react";
import { Typography } from "@mui/material";

type Props = {
  nodeId: number;
};

export const InspectorHead = ({ nodeId }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.InspectorHead",
  });

  const { ifcId } = useIfcContext();
  const { data: attributes } = useGetIfcAttributes(ifcId, nodeId);

  const nodeType = useMemo(() => {
    if (attributes === undefined) {
      return null;
    }

    const value = attributes.find(
      (attribute) => attribute.name === "type"
    )?.value;

    if (value === null || value === undefined) {
      return null;
    }

    return String(value);
  }, [attributes]);

  const nodeName = useMemo(() => {
    if (attributes === undefined) {
      return null;
    }

    const value = attributes.find(
      (attribute) => attribute.name === "Name"
    )?.value;

    if (
      value === null ||
      value === undefined ||
      typeof value !== "string" ||
      value.length === 0
    ) {
      return null;
    }

    return String(value);
  }, [attributes]);

  return (
    <PanelHead title={t("title")}>
      {nodeType !== null ? (
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ userSelect: "none" }}
          noWrap
        >
          {nodeType}#{nodeId}
          {nodeName !== null ? ` - ${nodeName}` : null}
        </Typography>
      ) : null}
    </PanelHead>
  );
};
