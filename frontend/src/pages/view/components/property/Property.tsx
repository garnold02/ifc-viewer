import type { Property as PropertyType } from "../../../../api/types/file/element/property";
import { LeafProperty } from "./LeafProperty";
import { NodeProperty } from "./NodeProperty";

type Props = {
  property: PropertyType;
  level: number;
  path: string;
};

export const Property = ({ property, level, path }: Props) => {
  switch (property.type) {
    case "leaf":
      return <LeafProperty leafProperty={property} level={level} />;

    case "node":
      return <NodeProperty nodeProperty={property} level={level} path={path} />;
  }
};
