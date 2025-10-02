import { Attributes } from "./Attributes";
import { useGetIfcPropertySets } from "../../../../api/queries/ifcPropertySets";
import { PropertySet } from "./PropertySet";
import { Panel } from "../Panel";
import { PanelBody } from "../PanelBody";
import { LinearProgress } from "@mui/material";
import { InspectorHead } from "./InspectorHead";
import type { IfcElement } from "../../../../types/ifc";
import { useIfcStore } from "../../../../stores/ifc/store";

type Props = {
  element: IfcElement;
};

export const Inspector = ({ element }: Props) => {
  const fileId = useIfcStore((state) => state.fileId);
  const { data: propertySets } = useGetIfcPropertySets(fileId, element.id);

  return (
    <Panel>
      <InspectorHead element={element} />
      <PanelBody>
        <Attributes key="attributes" element={element} />
        {propertySets !== undefined ? (
          propertySets.map((propertySet, i) => (
            <PropertySet
              key={`${propertySet.name}-${i}`}
              propertySet={propertySet}
              ordinal={i + 1}
            />
          ))
        ) : (
          <LinearProgress />
        )}
      </PanelBody>
    </Panel>
  );
};
