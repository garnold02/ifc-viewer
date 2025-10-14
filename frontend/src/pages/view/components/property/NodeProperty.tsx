import { Stack, TableCell, TableRow } from "@mui/material";
import type { NodeProperty as NodePropertyType } from "../../../../api/types/file/element/property";
import { useTranslation } from "react-i18next";
import { Property } from "./Property";
import { ExpandButton } from "./ExpandButton";
import { usePropertyStore } from "../../../../stores/property/store";
import { useMemo } from "react";
import { DescriptionTooltip } from "./DescriptionTooltip";

type Props = {
  nodeProperty: NodePropertyType;
  level: number;
  path: string;
};

export const NodeProperty = ({ nodeProperty, level, path }: Props) => {
  const { t: nameT } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.property.NodeProperty.name",
  });

  const expansionStates = usePropertyStore((state) => state.expansionStates);
  const expanded = useMemo(() => {
    if (path in expansionStates) {
      return expansionStates[path];
    }
    return false;
  }, [expansionStates, path]);

  return (
    <>
      <TableRow>
        <TableCell sx={{ paddingLeft: level * 2 }}>
          <Stack direction="row" alignItems="center">
            <ExpandButton path={path} />
            {nameT(nodeProperty.name, { defaultValue: nodeProperty.name })}
            <DescriptionTooltip description={nodeProperty.description} />
          </Stack>
        </TableCell>
        <TableCell />
      </TableRow>
      {expanded
        ? nodeProperty.children.map((child, i) => (
            <Property
              key={i}
              property={child}
              level={level + 1}
              path={`${path}/${child.name}`}
            />
          ))
        : null}
    </>
  );
};
