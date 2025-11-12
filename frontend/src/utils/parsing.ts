export const parseIntCorrectly = (input: string): number | null => {
  if (input.match(/^-?\d+$/) === null) {
    return null;
  }
  return Number.parseInt(input);
};
