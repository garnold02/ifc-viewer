import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { BatchInspectorHead } from "@pages/view/components/inspector/BatchInspectorHead";
import { Panel } from "@pages/view/components/Panel";
import { PanelBody } from "@pages/view/components/PanelBody";
import { useIfcStore } from "@stores/ifc/store";
import { useMemo } from "react";

type Props = {
  elementIds: number[];
};

export const BatchInspector = ({ elementIds }: Props) => {
  const elements = useIfcStore((state) => state.elements);

  const elementMap = useMemo(() => {
    const map: Record<string, number[]> = {};

    for (const elementId of elementIds) {
      const element = elements[elementId];

      if (element.type in map) {
        map[element.type].push(elementId);
      } else {
        map[element.type] = [elementId];
      }
    }

    return map;
  }, [elementIds, elements]);

  return (
    <Panel>
      <BatchInspectorHead elementIds={elementIds} />
      <PanelBody>
        <TableContainer>
          <Table>
            <TableBody>
              {Object.keys(elementMap).map((type) => (
                <TableRow>
                  <TableCell>{type}</TableCell>
                  <TableCell>{elementMap[type].length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PanelBody>
    </Panel>
  );
};
