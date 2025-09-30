import { ElementAttributes } from "./ElementAttributes";
import { useOutlinerStore } from "../../../../stores/outliner/store";
import { useGetIfcPropertySets } from "../../../../api/queries/ifcPropertySets";
import { useIfcContext } from "../../../../contexts/ifc";
import { PropertySet } from "./PropertySet";
import { Panel } from "../Panel";
import { PanelHead } from "../PanelHead";
import { useTranslation } from "react-i18next";
import { PanelBody } from "../PanelBody";

export const Inspector = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.inspector.Inspector",
  });

  const { ifcId } = useIfcContext();
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const { data: propertySets } = useGetIfcPropertySets(ifcId, selectedNodeId);

  if (selectedNodeId === null) {
    return null;
  }

  return (
    <Panel>
      <PanelHead title={t("title")} />
      <PanelBody>
        <ElementAttributes key="element-attributes" entityId={selectedNodeId} />
        {propertySets !== undefined
          ? propertySets.map((propertySet) => (
              <PropertySet key={propertySet.name} propertySet={propertySet} />
            ))
          : null}
      </PanelBody>
    </Panel>
  );
};
