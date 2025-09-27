import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

export type PropertySets = PropertySet[];

export type PropertySet = {
  name: string;
  properties: PropertySetProperty[];
};

export type PropertySetProperty = {
  name: string;
  description: string | null;
  value: PropertySetPropertyValue;
};

export type PropertySetPropertyValue =
  | PropertySetPropertyValueComplex
  | PropertySetPropertyValueBounded
  | PropertySetPropertyValueEnumerated
  | PropertySetPropertyValueList
  | PropertySetPropertyValueReference
  | PropertySetPropertyValueSingle
  | PropertySetPropertyValueTable
  | PropertySetPropertyValueArea
  | PropertySetPropertyValueCount
  | PropertySetPropertyValueLength
  | PropertySetPropertyValueTime
  | PropertySetPropertyValueVolume
  | PropertySetPropertyValueWeight;

export type PropertySetPropertyValueComplex = {
  type: "complex";
  complex: "TODO";
};

export type PropertySetPropertyValueBounded = {
  type: "bounded";
  bounded: "TODO";
};

export type PropertySetPropertyValueEnumerated = {
  type: "enumerated";
  enumerated: "TODO";
};

export type PropertySetPropertyValueList = {
  type: "list";
  list: "TODO";
};

export type PropertySetPropertyValueReference = {
  type: "reference";
  reference: "TODO";
};

export type PropertySetPropertyValueSingle = {
  type: "single";
  single: boolean | null | number | string;
};

export type PropertySetPropertyValueTable = {
  type: "table";
  table: "TODO";
};

export type PropertySetPropertyValueArea = {
  type: "area";
  area: number;
  formula: string | null;
};

export type PropertySetPropertyValueCount = {
  type: "count";
  count: number;
  formula: string | null;
};

export type PropertySetPropertyValueLength = {
  type: "length";
  length: number;
  formula: string | null;
};

export type PropertySetPropertyValueTime = {
  type: "time";
  time: number;
  formula: string | null;
};

export type PropertySetPropertyValueVolume = {
  type: "volume";
  volume: number;
  formula: string | null;
};

export type PropertySetPropertyValueWeight = {
  type: "weight";
  weight: number;
  formula: string | null;
};

export const useGetIfcPropertySets = (
  ifcId: number | null,
  entityId: number | null
) =>
  useQuery({
    enabled: ifcId !== null && entityId !== null,
    queryKey: ["ifc", ifcId, "psets", entityId],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/ifc/${ifcId}/psets/${entityId}`
      );
      const json = await response.json();
      return json as PropertySets;
    },
  });
