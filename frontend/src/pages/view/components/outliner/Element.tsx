import { useMemo } from "react";
import type { IfcElement } from "../../../../types/ifc";
import { Box, Stack } from "@mui/material";
import { ExpandButton } from "./ExpandButton";
import { TypeLabel } from "./TypeLabel";
import { NameLabel } from "./NameLabel";
import { VisibilityButton } from "./VisibilityButton";
import {
  createDefaultOutlinerNodeState,
  useIfcStore,
} from "../../../../stores/ifc/store";

type Props = {
  element: IfcElement;
};

export const Element = ({ element }: Props) => {
  const elements = useIfcStore((state) => state.elements);
  const nodeStates = useIfcStore((state) => state.outlinerNodeStates);

  const nodeState = useMemo(() => {
    if (element.id in nodeStates) {
      return nodeStates[element.id];
    } else {
      return createDefaultOutlinerNodeState(element);
    }
  }, [element, nodeStates]);

  const childComponents = useMemo(
    () =>
      element.child_ids.map((child_id) => (
        <Element key={child_id} element={elements[child_id]} />
      )),
    [element.child_ids, elements]
  );

  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center">
        <ExpandButton element={element} />
        <TypeLabel element={element} />
        <NameLabel element={element} />
        <Box marginLeft="auto" />
        <VisibilityButton variant="self" element={element} />
        <VisibilityButton variant="children" element={element} />
      </Stack>
      {nodeState.expanded ? (
        <Stack direction="column" paddingLeft={1}>
          {childComponents}
        </Stack>
      ) : null}
    </Stack>
  );
};
