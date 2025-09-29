import type {
  TreeNode,
  TreeNodeGeometry,
  TreeNodeGeometryTransform,
  TreeNodeMesh,
} from "../api/queries/ifcTree";

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

export const parseTreeNode = (
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

  const hasGeometry = dataView.getUint8(offset) !== 0;
  offset += 1;

  let geometry: TreeNodeGeometry | null = null;

  if (hasGeometry) {
    const [parsedGeometry, newOffset] = parseTreeNodeGeometry(buffer, offset);
    geometry = parsedGeometry;
    offset = newOffset;
  }

  const numChildren = dataView.getUint32(offset, true);
  offset += 4;

  const children: TreeNode[] = [];

  for (let i = 0; i < numChildren; ++i) {
    const [child, newOffset] = parseTreeNode(buffer, offset);
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

export const parseTreeNodeGeometry = (
  buffer: ArrayBuffer,
  offset: number
): [TreeNodeGeometry, number] => {
  const dataView = new DataView(buffer);

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

  return [
    {
      transform,
      meshes,
    },
    offset,
  ];
};

export const parsePreview = (
  buffer: ArrayBuffer,
  offset: number
): [TreeNodeGeometry[], number] => {
  const dataView = new DataView(buffer);

  const numGeometries = dataView.getUint32(offset, true);
  offset += 4;

  const geometries: TreeNodeGeometry[] = [];

  for (let i = 0; i < numGeometries; ++i) {
    const [geometry, newOffset] = parseTreeNodeGeometry(buffer, offset);
    geometries.push(geometry);
    offset = newOffset;
  }

  return [geometries, offset];
};
