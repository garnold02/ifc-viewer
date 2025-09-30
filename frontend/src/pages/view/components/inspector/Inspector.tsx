import { Stack } from "@mui/material";
import { ElementAttributes } from "./ElementAttributes";
import { useOutlinerStore } from "../../../../stores/outliner/store";
import { useGetIfcPropertySets } from "../../../../api/queries/ifcPropertySets";
import { useIfcContext } from "../../../../contexts/ifc";
import { PropertySet } from "./PropertySet";

export const Inspector = () => {
  const { ifcId } = useIfcContext();
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const { data: propertySets } = useGetIfcPropertySets(ifcId, selectedNodeId);

  if (selectedNodeId === null) {
    return null;
  }

  return (
    <Stack
      gap={1}
      padding={1}
      sx={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <ElementAttributes key="element-attributes" entityId={selectedNodeId} />
      {propertySets !== undefined
        ? propertySets.map((propertySet) => (
            <PropertySet key={propertySet.name} propertySet={propertySet} />
          ))
        : null}
    </Stack>
  );
};
