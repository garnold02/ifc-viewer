import type { IfcGeometry } from "../types/ifc";

type Props = {
  geometry: IfcGeometry;
};

export const IfcItemPreviewGeometry = ({ geometry }: Props) => {
  return geometry.meshes.map((m, i) => (
    <mesh key={i} matrixAutoUpdate={false} matrix={geometry.matrix}>
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
        color={m.color}
        opacity={m.opacity}
        transparent={m.opacity !== 1.0}
      />
    </mesh>
  ));
};
