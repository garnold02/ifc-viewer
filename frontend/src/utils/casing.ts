export const pascalToSentenceCase = (input: string): string => {
  const value = input
    .replace(/([A-Z])/g, " $1")
    .replace("Ifc", "")
    .trim();
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
