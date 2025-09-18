export const defaultVisibilityOf = (ifcEntityType: string) => {
  // Entity types found in this array are *invisible* by default
  return !["IfcOpeningElement", "IfcSpace"].includes(ifcEntityType);
};
