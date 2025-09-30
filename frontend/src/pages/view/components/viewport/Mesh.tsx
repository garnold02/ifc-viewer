import { Plane, Quaternion, Vector3, type Color, type Matrix4 } from "three";
import { useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import type { IfcMesh } from "../../../../types/ifc";
import { useToolStore } from "../../../../stores/tool/store";

type Props = {
  matrix: Matrix4;
  mesh: IfcMesh;
  emissive: Color;
  onClick: (event: ThreeEvent<MouseEvent>) => void;
};

export const Mesh = ({ matrix, mesh, emissive, onClick }: Props) => {
  const currentToolType = useToolStore((state) => state.current);
  const clipVisible = useToolStore((state) => state.clipState.visible);
  const clipMatrix = useToolStore((state) => state.clipState.matrix);

  const clippingPlanes = useMemo(() => {
    if (!clipVisible && currentToolType !== "clip") {
      return [];
    }

    const zAxis = new Vector3();
    const position = new Vector3();

    clipMatrix.extractBasis(new Vector3(), new Vector3(), zAxis);
    clipMatrix.decompose(position, new Quaternion(), new Vector3());
    return [new Plane(zAxis.negate(), 0).translate(position)];
  }, [currentToolType, clipVisible, clipMatrix]);

  const geometry = useMemo(
    () => (
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
    ),
    [mesh.positions, mesh.normals]
  );

  const material = useMemo(
    () => (
      <meshLambertMaterial
        color={mesh.color}
        opacity={mesh.opacity}
        transparent={mesh.opacity !== 1.0}
        emissive={emissive}
        clippingPlanes={clippingPlanes}
      />
    ),
    [clippingPlanes, mesh.color, mesh.opacity, emissive]
  );

  return (
    <mesh matrixAutoUpdate={false} matrix={matrix} onClick={onClick}>
      {geometry}
      {material}
    </mesh>
  );
};
