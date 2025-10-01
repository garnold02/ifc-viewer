import { ElementAttributes } from "./ElementAttributes";
import { useGetIfcPropertySets } from "../../../../api/queries/ifcPropertySets";
import { useIfcContext } from "../../../../contexts/ifc";
import { PropertySet } from "./PropertySet";
import { Panel } from "../Panel";
import { PanelBody } from "../PanelBody";
import { LinearProgress } from "@mui/material";
import { InspectorHead } from "./InspectorHead";

type Props = {
  nodeId: number;
};

export const Inspector = ({ nodeId }: Props) => {
  const { ifcId } = useIfcContext();
  const { data: propertySets } = useGetIfcPropertySets(ifcId, nodeId);

  return (
    <Panel>
      <InspectorHead nodeId={nodeId} />
      <PanelBody>
        <ElementAttributes key="element-attributes" entityId={nodeId} />
        {propertySets !== undefined ? (
          propertySets.map((propertySet) => (
            <PropertySet key={propertySet.name} propertySet={propertySet} />
          ))
        ) : (
          <LinearProgress />
        )}
      </PanelBody>
    </Panel>
  );
};
