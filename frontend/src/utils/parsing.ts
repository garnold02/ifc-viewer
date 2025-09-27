export const parseIntCorrectly = (input: string): number | null => {
  if (input.match(/^-?\d+$/) === null) {
    return null;
  }
  return Number.parseInt(input);
};

export const parseFloatCorrectly = (input: string): number | null => {
  if (input.match(/^-?\d+(\.\d+)?$/) === null) {
    return null;
  }
  return Number.parseFloat(input);
};
