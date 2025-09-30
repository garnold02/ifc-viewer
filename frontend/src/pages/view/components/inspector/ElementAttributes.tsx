import { useMemo } from "react";
import { useGetIfcAttributes } from "../../../../api/queries/ifcAttributes";
import { useIfcContext } from "../../../../contexts/ifc";
import type { IfcPropertySet } from "../../../../types/ifc";
import { useTranslation } from "react-i18next";
import { PropertySet } from "./PropertySet";

type Props = {
  entityId: number;
};

export const ElementAttributes = ({ entityId }: Props) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.ElementAttributes",
  });

  const { ifcId } = useIfcContext();
  const { data: attributes } = useGetIfcAttributes(ifcId, entityId);

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
