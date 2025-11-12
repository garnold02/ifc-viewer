import { getCameraMoving, setCameraMoving } from "@global/camera";
import { expect, test } from "vitest";

test("cameraMoving is false by default", () => {
  expect(getCameraMoving()).toBe(false);
});

test("setCameraMoving affects the value of getCameraMoving", () => {
  expect(getCameraMoving()).toBe(false);
  setCameraMoving(true);
  expect(getCameraMoving()).toBe(true);
});
