import { Color, Matrix4 } from "three";
import type { IfcGeometry, IfcMesh, IfcNode } from "../types/ifc";

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

  getIfcMesh(): IfcMesh {
    return {
      color: this.getColor(),
      opacity: this.getFloat32(),
      positions: new Float32Array(
        this.getArray(this.getUint32(), () => this.getFloat32())
      ),
      normals: new Float32Array(
        this.getArray(this.getUint32(), () => this.getFloat32())
      ),
    };
  }

  getIfcGeometry(): IfcGeometry {
    return {
      matrix: this.getMatrix4(),
      meshes: this.getArray(this.getUint32(), () => this.getIfcMesh()),
    };
  }

  getIfcGeometryOrNull(): IfcGeometry | null {
    return this.getUint8() === 1 ? this.getIfcGeometry() : null;
  }

  getIfcNode(): IfcNode {
    return {
      id: this.getUint32(),
      type: this.getString(),
      name: this.getStringOrNull(),
      geometry: this.getIfcGeometryOrNull(),
      children: this.getArray(this.getUint32(), () => this.getIfcNode()),
    };
  }
}
