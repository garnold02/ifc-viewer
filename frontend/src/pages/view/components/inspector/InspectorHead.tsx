import { useTranslation } from "react-i18next";
import { PanelHead } from "../PanelHead";
import { useGetIfcAttributes } from "../../../../api/queries/ifcAttributes";
import { useMemo } from "react";
import { Typography } from "@mui/material";
import type { IfcElement } from "../../../../types/ifc";
import { useIfcStore } from "../../../../stores/ifc/store";

type Props = {
  element: IfcElement;
};

export const InspectorHead = ({ element }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.InspectorHead",
  });

  const fileId = useIfcStore((state) => state.fileId);
  const { data: attributes } = useGetIfcAttributes(fileId, element.id);

  const elementTypeAttribute = useMemo(() => {
    if (attributes === undefined) {
      return null;
    }

    const value = attributes.find(
      (attribute) => attribute.name === "type"
    )?.value;

    if (
      value === undefined ||
      value.type !== "value" ||
      typeof value.value !== "string"
    ) {
      return null;
    }

    return value.value;
  }, [attributes]);

  const elementNameAttribute = useMemo(() => {
    if (attributes === undefined) {
      return null;
    }

    const value = attributes.find(
      (attribute) => attribute.name === "Name"
    )?.value;

    if (
      value === undefined ||
      value.type !== "value" ||
      typeof value.value !== "string" ||
      value.value.length === 0
    ) {
      return null;
    }

    return value.value;
  }, [attributes]);

  return (
    <PanelHead title={t("title")}>
      {elementTypeAttribute !== null ? (
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ userSelect: "none" }}
          noWrap
        >
          {elementTypeAttribute}#{element.id}
          {elementNameAttribute !== null ? ` - ${elementNameAttribute}` : null}
        </Typography>
      ) : null}
    </PanelHead>
  );
};
