import type { ElementGeometry } from "@api/types/file/element";

type Props = {
  geometry: ElementGeometry;
};

export const PreviewGeometry = ({ geometry }: Props) => {
  return geometry.meshes.map((mesh, i) => (
    <mesh key={i} matrixAutoUpdate={false} matrix={geometry.matrix}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={mesh.positions}
          count={mesh.positions.length / 3}
          itemSize={3}
          args={[mesh.positions, 3, false]}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={mesh.normals}
          count={mesh.normals.length / 3}
          itemSize={3}
          args={[mesh.normals, 3, false]}
        />
      </bufferGeometry>
      <meshLambertMaterial
        color={mesh.color}
        opacity={mesh.opacity}
        transparent={mesh.opacity !== 1.0}
      />
    </mesh>
  ));
};
