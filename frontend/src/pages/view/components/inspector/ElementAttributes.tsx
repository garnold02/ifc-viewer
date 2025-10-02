import { useMemo } from "react";
import { useGetIfcAttributes } from "../../../../api/queries/ifcAttributes";
import type { IfcElement, IfcPropertySet } from "../../../../types/ifc";
import { useTranslation } from "react-i18next";
import { PropertySet } from "./PropertySet";
import { useIfcStore } from "../../../../stores/ifc/store";

type Props = {
  element: IfcElement;
};

export const ElementAttributes = ({ element }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.ElementAttributes",
  });

  const fileId = useIfcStore((state) => state.fileId);
  const { data: attributes } = useGetIfcAttributes(fileId, element.id);

  const propertySet: IfcPropertySet | null = useMemo(
    () =>
      attributes !== undefined
        ? {
            name: t("title"),
            properties: attributes.map((attribute) => ({
              name: attribute.name,
              description: null,
              value: { type: "single", single: attribute.value },
            })),
          }
        : null,
    [attributes]
  );

  if (propertySet === null) {
    return null;
  }

  return <PropertySet propertySet={propertySet} />;
};
