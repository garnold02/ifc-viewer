import type {
  Element,
  ElementGeometry,
  ElementGeometryMesh,
} from "@api/types/element";
import { BinaryParser } from "@utils/BinaryParser";
import { Color, Matrix4 } from "three";
import { expect, test } from "vitest";

test("BinaryParser parses uint8", () => {
  expect(new BinaryParser(new Uint8Array([123]).buffer).getUint8()).toBe(123);
});

test("BinaryParser parses uint32", () => {
  expect(
    new BinaryParser(new Uint32Array([123456789]).buffer).getUint32()
  ).toBe(123456789);
});

test("BinaryParser parses uint32 or null", () => {
  expect(
    new BinaryParser(new Uint8Array([1, 123, 0, 0, 0]).buffer).getUint32OrNull()
  ).toBe(123);
  expect(new BinaryParser(new Uint8Array([0]).buffer).getUint32OrNull()).toBe(
    null
  );
});

test("BinaryParser parses float32", () => {
  const expected = 123.456;
  const actual = new BinaryParser(
    new Float32Array([expected]).buffer
  ).getFloat32();
  const delta = Math.abs(expected - actual);
  expect(delta).toBeLessThan(0.0001);
});

test("BinaryParser parses bytes", () => {
  expect(
    new BinaryParser(new Uint8Array([1, 2, 3, 4, 5]).buffer).getBytes(5)
  ).toStrictEqual(new Uint8Array([1, 2, 3, 4, 5]).buffer);
});

test("BinaryParser parses string", () => {
  const expected = "Hello";
  const actual = new BinaryParser(
    new Uint8Array([5, 0, 0, 0, 72, 101, 108, 108, 111]).buffer
  ).getString();
  expect(expected).toBe(actual);
});

test("BinaryParser parses string or null", () => {
  const expected = "Hello";
  const actual = new BinaryParser(
    new Uint8Array([5, 0, 0, 0, 72, 101, 108, 108, 111]).buffer
  ).getStringOrNull();
  expect(expected).toBe(actual);
  expect(
    new BinaryParser(new Uint8Array([0, 0, 0, 0]).buffer).getStringOrNull()
  ).toBe(null);
});

test("BinaryParser parses Matrix4", () => {
  expect(
    new BinaryParser(
      new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]).buffer
    ).getMatrix4()
  ).toStrictEqual(new Matrix4().identity());
});

test("BinaryParser parses Color", () => {
  const expected = new Color(0, 0.5, 1);
  const actual = new BinaryParser(
    new Float32Array([0, 0.5, 1]).buffer
  ).getColor();
  expect(expected).toStrictEqual(actual);
});

test("BinaryParser parses array", () => {
  const parser = new BinaryParser(new Uint32Array([1, 2, 3]).buffer);
  expect(parser.getArray(3, () => parser.getUint32())).toStrictEqual([1, 2, 3]);
});

test("BinaryParser parses mesh", () => {
  const expected: ElementGeometryMesh = {
    color: new Color(0, 0, 0),
    opacity: 0,
    positions: new Float32Array([0, 0, 0]),
    normals: new Float32Array([0, 0, 0]),
  };

  const actual = new BinaryParser(
    new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]).buffer
  ).getElementGeometryMesh();

  expect(expected).toStrictEqual(actual);
});

test("BinaryParser parses geometry", () => {
  const expected: ElementGeometry = {
    matrix: new Matrix4().identity(),
    meshes: [
      {
        color: new Color(0, 0, 0),
        opacity: 0,
        positions: new Float32Array([]),
        normals: new Float32Array([]),
      },
    ],
  };

  const actual = new BinaryParser(
    new Uint8Array([
      0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
      63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]).buffer
  ).getElementGeometry();

  expect(expected).toStrictEqual(actual);
});

test("BinaryParser parses geometry or null", () => {
  const expected: ElementGeometry = {
    matrix: new Matrix4().identity(),
    meshes: [
      {
        color: new Color(0, 0, 0),
        opacity: 0,
        positions: new Float32Array([]),
        normals: new Float32Array([]),
      },
    ],
  };

  const actual = new BinaryParser(
    new Uint8Array([
      1, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]).buffer
  ).getElementGeometryOrNull();

  expect(expected).toStrictEqual(actual);

  expect(
    new BinaryParser(new Uint8Array([0]).buffer).getElementGeometryOrNull()
  ).toBe(null);
});

test("BinaryParser parses element", () => {
  const expected: Element = {
    id: 100,
    type: "A",
    name: "B",
    geometry: null,
    parent_id: 200,
    child_ids: [10, 20],
  };

  const actual = new BinaryParser(
    new Uint8Array([
      100, 0, 0, 0, 1, 0, 0, 0, 65, 1, 0, 0, 0, 66, 0, 1, 200, 0, 0, 0, 2, 0, 0,
      0, 10, 0, 0, 0, 20, 0, 0, 0,
    ]).buffer
  ).getElement();

  expect(expected).toStrictEqual(actual);
});

test("BinaryParser parses elements", () => {
  const expected: Record<number, Element> = {
    100: {
      id: 100,
      type: "A",
      name: "B",
      geometry: null,
      parent_id: 200,
      child_ids: [10, 20],
    },
    200: {
      id: 200,
      type: "C",
      name: "D",
      geometry: null,
      parent_id: 100,
      child_ids: [30, 40],
    },
  };

  const actual = new BinaryParser(
    new Uint8Array([
      100, 0, 0, 0, 1, 0, 0, 0, 65, 1, 0, 0, 0, 66, 0, 1, 200, 0, 0, 0, 2, 0, 0,
      0, 10, 0, 0, 0, 20, 0, 0, 0, 200, 0, 0, 0, 1, 0, 0, 0, 67, 1, 0, 0, 0, 68,
      0, 1, 100, 0, 0, 0, 2, 0, 0, 0, 30, 0, 0, 0, 40, 0, 0, 0,
    ]).buffer
  ).getElements();

  expect(expected).toStrictEqual(actual);
});
