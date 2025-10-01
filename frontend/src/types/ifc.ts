import type { Color, Matrix4 } from "three";

export type IfcSummary = {
  id: number;
  name: string;
  schema: string;
};

export type IfcNode = {
  id: number;
  type: string;
  name: string | null;
  geometry: IfcGeometry | null;
  children: IfcNode[];
};

export type IfcGeometry = {
  matrix: Matrix4;
  meshes: IfcMesh[];
};

export type IfcMesh = {
  color: Color;
  opacity: number;
  positions: Float32Array;
  normals: Float32Array;
};

export type IfcAttribute = {
  name: string;
  value: null | number | string;
};

export type IfcPropertySet = {
  name: string;
  properties: IfcProperty[];
};

export type IfcProperty = {
  name: string;
  description: string | null;
  value: IfcPropertyValue;
};

export type IfcPropertyValue =
  | IfcPropertyValueComplex
  | IfcPropertyValueBounded
  | IfcPropertyValueEnumerated
  | IfcPropertyValueList
  | IfcPropertyValueReference
  | IfcPropertyValueSingle
  | IfcPropertyValueTable
  | IfcPropertyValueArea
  | IfcPropertyValueCount
  | IfcPropertyValueLength
  | IfcPropertyValueTime
  | IfcPropertyValueVolume
  | IfcPropertyValueWeight;

export type IfcPropertyValueComplex = {
  type: "complex";
  complex: "TODO";
};

export type IfcPropertyValueBounded = {
  type: "bounded";
  bounded: "TODO";
};

export type IfcPropertyValueEnumerated = {
  type: "enumerated";
  enumerated: "TODO";
};

export type IfcPropertyValueList = {
  type: "list";
  list: "TODO";
};

export type IfcPropertyValueReference = {
  type: "reference";
  reference: "TODO";
};

export type IfcPropertyValueSingle = {
  type: "single";
  single: boolean | null | number | string;
};

export type IfcPropertyValueTable = {
  type: "table";
  table: "TODO";
};

export type IfcPropertyValueArea = {
  type: "area";
  area: number;
  formula: string | null;
};

export type IfcPropertyValueCount = {
  type: "count";
  count: number;
  formula: string | null;
};

export type IfcPropertyValueLength = {
  type: "length";
  length: number;
  formula: string | null;
};

export type IfcPropertyValueTime = {
  type: "time";
  time: number;
  formula: string | null;
};

export type IfcPropertyValueVolume = {
  type: "volume";
  volume: number;
  formula: string | null;
};

export type IfcPropertyValueWeight = {
  type: "weight";
  weight: number;
  formula: string | null;
};
