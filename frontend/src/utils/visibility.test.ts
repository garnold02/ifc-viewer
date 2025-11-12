import { defaultVisibilityOf } from "@utils/visibility";
import { expect, test } from "vitest";

test("IfcOpeningElement elements are invisible by default", () => {
  expect(defaultVisibilityOf("IfcOpeningElement")).toBe(false);
});

test("IfcSpace elements are invisible by default", () => {
  expect(defaultVisibilityOf("IfcSpace")).toBe(false);
});
