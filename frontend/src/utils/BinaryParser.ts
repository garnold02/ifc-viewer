import type {
  Element,
  ElementGeometry,
  ElementGeometryMesh,
} from "@api/types/file/element";
import { Color, Matrix4 } from "three";

export class BinaryParser {
  #arrayBuffer: ArrayBuffer;
  #dataView: DataView;
  #textDecoder: TextDecoder;
  #offset: number;

  constructor(arrayBuffer: ArrayBuffer) {
    this.#arrayBuffer = arrayBuffer;
    this.#dataView = new DataView(this.#arrayBuffer);
    this.#textDecoder = new TextDecoder();
    this.#offset = 0;
  }

  getUint8(): number {
    const result = this.#dataView.getUint8(this.#offset);
    this.#offset += 1;
    return result;
  }

  getUint32(): number {
    const result = this.#dataView.getUint32(this.#offset, true);
    this.#offset += 4;
    return result;
  }

  getUint32OrNull(): number | null {
    return this.getUint8() > 0 ? this.getUint32() : null;
  }

  getFloat32(): number {
    const result = this.#dataView.getFloat32(this.#offset, true);
    this.#offset += 4;
    return result;
  }

  getBytes(length: number): ArrayBuffer {
    const result = this.#arrayBuffer.slice(this.#offset, this.#offset + length);
    this.#offset += length;
    return result;
  }

  getString(): string {
    const length = this.getUint32();
    const bytes = this.getBytes(length);
    return this.#textDecoder.decode(bytes);
  }

  getStringOrNull(): string | null {
    const result = this.getString();
    return result.length > 0 ? result : null;
  }

  getMatrix4(): Matrix4 {
    return new Matrix4(
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32(),
      this.getFloat32()
    ).transpose();
  }

  getColor(): Color {
    return new Color(this.getFloat32(), this.getFloat32(), this.getFloat32());
  }

  getArray<T>(length: number, getElement: () => T): T[] {
    return Array.from(Array(length).keys()).map((_) => getElement());
  }

  getElementGeometryMesh(): ElementGeometryMesh {
    const color = this.getColor();
    const opacity = this.getFloat32();
    const numCoords = this.getUint32();

    const positions = new Float32Array(
      this.getArray(numCoords, () => this.getFloat32())
    );

    const normals = new Float32Array(
      this.getArray(numCoords, () => this.getFloat32())
    );

    return {
      color,
      opacity,
      positions,
      normals,
    };
  }

  getElementGeometry(): ElementGeometry {
    return {
      matrix: this.getMatrix4(),
      meshes: this.getArray(this.getUint32(), () =>
        this.getElementGeometryMesh()
      ),
    };
  }

  getElementGeometryOrNull(): ElementGeometry | null {
    return this.getUint8() === 1 ? this.getElementGeometry() : null;
  }

  getElement(): Element {
    return {
      id: this.getUint32(),
      type: this.getString(),
      name: this.getStringOrNull(),
      geometry: this.getElementGeometryOrNull(),
      parent_id: this.getUint32OrNull(),
      child_ids: this.getArray(this.getUint32(), () => this.getUint32()),
    };
  }

  getElements(): Record<number, Element> {
    const nodes: Record<number, Element> = {};
    while (this.#offset < this.#arrayBuffer.byteLength) {
      const node = this.getElement();
      nodes[node.id] = node;
    }
    return nodes;
  }
}
