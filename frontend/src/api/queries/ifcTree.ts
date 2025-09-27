import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

export type TreeNode = {
  id: number;
  type: string;
  name: string | null;
  geometry: TreeNodeGeometry | null;
  children: TreeNode[];
};

export type TreeNodeGeometry = {
  transform: TreeNodeGeometryTransform;
  meshes: TreeNodeMesh[];
};

export type TreeNodeGeometryTransform = [
  n11: number,
  n12: number,
  n13: number,
  n14: number,
  n21: number,
  n22: number,
  n23: number,
  n24: number,
  n31: number,
  n32: number,
  n33: number,
  n34: number,
  n41: number,
  n42: number,
  n43: number,
  n44: number,
];

export type TreeNodeMesh = {
  color: TreeNodeMeshColor;
  positions: Float32Array;
  normals: Float32Array;
};

export type TreeNodeMeshColor = [r: number, g: number, b: number, a: number];

export const useGetIfcTree = (id: number | null) =>
  useQuery({
    enabled: id !== null,
    queryKey: ["ifc", id, "tree"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/ifc/${id}/tree`);
      const arrayBuffer = await response.arrayBuffer();
      const [rootNode] = collectNode(arrayBuffer, 0);
      return rootNode;
    },
  });

const collectNode = (
  buffer: ArrayBuffer,
  offset: number
): [TreeNode, number] => {
  const dataView = new DataView(buffer);
  const textDecoder = new TextDecoder();

  const id = dataView.getUint32(offset, true);
  offset += 4;

  const typeLength = dataView.getUint32(offset, true);
  offset += 4;

  const typeBytes = buffer.slice(offset, offset + typeLength);
  offset += typeLength;

  const type = textDecoder.decode(typeBytes);

  const nameLength = dataView.getUint32(offset, true);
  offset += 4;

  const nameBytes = buffer.slice(offset, offset + nameLength);
  offset += nameLength;

  const name = textDecoder.decode(nameBytes);

  const hasObject = dataView.getUint8(offset) !== 0;
  offset += 1;

  let geometry: TreeNodeGeometry | null = null;

  if (hasObject) {
    const n11 = dataView.getFloat32(offset, true);
    offset += 4;

    const n12 = dataView.getFloat32(offset, true);
    offset += 4;

    const n13 = dataView.getFloat32(offset, true);
    offset += 4;

    const n14 = dataView.getFloat32(offset, true);
    offset += 4;

    const n21 = dataView.getFloat32(offset, true);
    offset += 4;

    const n22 = dataView.getFloat32(offset, true);
    offset += 4;

    const n23 = dataView.getFloat32(offset, true);
    offset += 4;

    const n24 = dataView.getFloat32(offset, true);
    offset += 4;

    const n31 = dataView.getFloat32(offset, true);
    offset += 4;

    const n32 = dataView.getFloat32(offset, true);
    offset += 4;

    const n33 = dataView.getFloat32(offset, true);
    offset += 4;

    const n34 = dataView.getFloat32(offset, true);
    offset += 4;

    const n41 = dataView.getFloat32(offset, true);
    offset += 4;

    const n42 = dataView.getFloat32(offset, true);
    offset += 4;

    const n43 = dataView.getFloat32(offset, true);
    offset += 4;

    const n44 = dataView.getFloat32(offset, true);
    offset += 4;

    const transform: TreeNodeGeometryTransform = [
      n11,
      n12,
      n13,
      n14,
      n21,
      n22,
      n23,
      n24,
      n31,
      n32,
      n33,
      n34,
      n41,
      n42,
      n43,
      n44,
    ];

    const meshes: TreeNodeMesh[] = [];
    const numMeshes = dataView.getUint32(offset, true);
    offset += 4;

    for (let i = 0; i < numMeshes; ++i) {
      const r = dataView.getFloat32(offset, true);
      offset += 4;

      const g = dataView.getFloat32(offset, true);
      offset += 4;

      const b = dataView.getFloat32(offset, true);
      offset += 4;

      const a = dataView.getFloat32(offset, true);
      offset += 4;

      const positionCoords: number[] = [];

      const numPositionCoords = dataView.getUint32(offset, true);
      offset += 4;

      for (let j = 0; j < numPositionCoords; ++j) {
        positionCoords.push(dataView.getFloat32(offset, true));
        offset += 4;
      }

      const normalCoords: number[] = [];

      const numNormalCoords = dataView.getUint32(offset, true);
      offset += 4;

      for (let j = 0; j < numNormalCoords; ++j) {
        normalCoords.push(dataView.getFloat32(offset, true));
        offset += 4;
      }

      meshes.push({
        color: [r, g, b, a],
        positions: new Float32Array(positionCoords),
        normals: new Float32Array(normalCoords),
      });
    }

    geometry = {
      transform,
      meshes,
    };
  }

  const numChildren = dataView.getUint32(offset, true);
  offset += 4;

  const children: TreeNode[] = [];

  for (let i = 0; i < numChildren; ++i) {
    const [child, newOffset] = collectNode(buffer, offset);
    children.push(child);
    offset = newOffset;
  }

  return [
    {
      id,
      type,
      name,
      geometry,
      children,
    },
    offset,
  ];
};
