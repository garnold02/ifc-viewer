import {
  LinearProgress,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useGetFileElementPropertyTree } from "../../../../api/hooks/file/element/propertyTree";
import { useIfcStore } from "../../../../stores/ifc/store";
import { Property } from "./Property";
import { PropertyStoreProvider } from "../../../../stores/property/Provider";
import { useMemo } from "react";

type Props = {
  elementId: number;
  onlyAttributes?: boolean;
};

export const PropertyTree = ({ elementId, onlyAttributes }: Props) => {
  const fileId = useIfcStore((state) => state.fileId);
  const { data: rootProperty } = useGetFileElementPropertyTree(
    fileId,
    elementId
  );

  const children = useMemo(() => {
    if (rootProperty === undefined || rootProperty.type !== "node") {
      return null;
    }
    if (onlyAttributes) {
      const attributes = rootProperty.children.find(
        (child) => child.name === "__attributes__"
      );
      if (attributes === undefined || attributes.type === "leaf") {
        return [];
      }
      return attributes.children;
    }
    return rootProperty.children;
  }, [onlyAttributes, rootProperty]);

  if (rootProperty === undefined) {
    return <LinearProgress />;
  }

  if (rootProperty.type !== "node") {
    return null;
  }

  if (children === null) {
    return <LinearProgress />;
  }

  return (
    <PropertyStoreProvider>
      <TableContainer>
        <Table>
          <TableBody>
            {children.map((child, i) => (
              <Property
                key={i}
                property={child}
                level={0}
                path={`${child.name}.${i}`}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PropertyStoreProvider>
  );
};
