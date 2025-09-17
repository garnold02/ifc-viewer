export type IfcHierarchyNode = {
  id: number;
  type: string;
  name: string;
  children: IfcHierarchyNode;
};
