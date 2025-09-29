import type { TreeNodeGeometry } from "../api/queries/ifcTree";

type Props = {
  geometry: TreeNodeGeometry;
};

export const IfcItemPreviewGeometry = ({ geometry }: Props) => {
  return geometry.meshes.map((m, i) => (
    <mesh key={i} matrixAutoUpdate={false} matrix={geometry.transform}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={m.positions}
          count={m.positions.length / 3}
          itemSize={3}
          args={[m.positions, 3, false]}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={m.normals}
          count={m.normals.length / 3}
          itemSize={3}
          args={[m.normals, 3, false]}
        />
      </bufferGeometry>
      <meshLambertMaterial
        color={[m.color[0], m.color[1], m.color[2]]}
        opacity={m.color[3] !== 1.0 ? m.color[3] : undefined}
        transparent={m.color[3] !== 1.0}
      />
    </mesh>
  ));
};
