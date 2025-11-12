import { parseIntCorrectly } from "@utils/parsing";
import { expect, test } from "vitest";

test("well-formed integer parses correctly", () => {
  expect(parseIntCorrectly("12345")).toBe(12345);
});

test("integer with garbage in between is discarded by parser", () => {
  expect(parseIntCorrectly("ab12345")).toBe(null);
  expect(parseIntCorrectly("123ab45")).toBe(null);
  expect(parseIntCorrectly("12345ab")).toBe(null);
});

test("float is discarded by integer parser", () => {
  expect(parseIntCorrectly("12.3")).toBe(null);
});
