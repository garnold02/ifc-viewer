import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo } from "react";
import {
  createDefaultOutlinerNodeState,
  useIfcStore,
} from "../../../../stores/ifc/store";
import {
  BufferAttribute,
  BufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Group,
  Matrix4,
  Color,
  Vector3,
  Quaternion,
  Plane,
} from "three";
import { defaultVisibilityOf } from "../../../../utils/visibility";
import type { IfcElement } from "../../../../types/ifc";
import { getCameraMoving } from "../../../../global/camera";

export const Scene = () => {
  const { gl, scene, raycaster } = useThree();

  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  const elements = useIfcStore((state) => state.elements);
  const meshes = useMemo(() => {
    const array: Mesh<BufferGeometry, MeshLambertMaterial>[] = [];

    for (const element of Object.values(elements)) {
      if (element.geometry === null) {
        continue;
      }

      for (const mesh of element.geometry.meshes) {
        const bufferGeometry = new BufferGeometry();

        bufferGeometry.setAttribute(
          "position",
          new BufferAttribute(mesh.positions, 3)
        );

        bufferGeometry.setAttribute(
          "normal",
          new BufferAttribute(mesh.normals, 3)
        );

        const material = new MeshLambertMaterial({
          color: mesh.color,
          opacity: mesh.opacity,
          transparent: mesh.opacity != 1,
        });

        const threeMesh = new Mesh(bufferGeometry, material);
        threeMesh.matrixAutoUpdate = false;
        threeMesh.matrix = element.geometry.matrix;
        threeMesh.userData = { element };
        threeMesh.layers.enable(1);

        if (!defaultVisibilityOf(element.type)) {
          threeMesh.visible = false;
          threeMesh.layers.disable(1);
        }

        array.push(threeMesh);
      }
    }

    return array;
  }, [elements]);

  useEffect(() => {
    const group = new Group();
    group.matrixAutoUpdate = false;
    group.matrix = new Matrix4().makeRotationX(-Math.PI / 2);
    group.add(...meshes);
    scene.add(group);
    return () => {
      scene.remove(group);
    };
  }, [meshes, scene]);

  const selectedElement = useIfcStore((state) => state.selectedElement);
  const setSelectedElement = useIfcStore((state) => state.setSelectedElement);

  useEffect(() => {
    meshes.forEach((mesh) => {
      let highlight = false;
      let currentElement: IfcElement = mesh.userData["element"];

      while (true) {
        if (currentElement === selectedElement) {
          highlight = true;
          break;
        }

        if (currentElement.parent_id === null) {
          break;
        }

        currentElement = elements[currentElement.parent_id];
      }

      if (highlight) {
        mesh.material.emissive = new Color(0, 0.125, 0.5);
      } else {
        mesh.material.emissive = new Color(0, 0, 0);
      }
    });
  }, [elements, meshes, selectedElement]);

  const nodeStates = useIfcStore((state) => state.outlinerNodeStates);

  useEffect(() => {
    meshes.forEach((mesh) => {
      let visible = true;

      let currentElement: IfcElement = mesh.userData["element"];
      let nodeState =
        currentElement.id in nodeStates
          ? nodeStates[currentElement.id]
          : createDefaultOutlinerNodeState(currentElement);

      if (!nodeState.selfVisible) {
        visible = false;
      } else {
        while (true) {
          if (currentElement.parent_id === null) {
            break;
          }

          currentElement = elements[currentElement.parent_id];
          nodeState =
            currentElement.id in nodeStates
              ? nodeStates[currentElement.id]
              : createDefaultOutlinerNodeState(currentElement);

          if (!nodeState.childrenVisible) {
            visible = false;
            break;
          }
        }
      }

      if (visible) {
        mesh.layers.enable(1);
      } else {
        mesh.layers.disable(1);
      }

      mesh.visible = visible;
    });
  }, [meshes, nodeStates]);

  // hack: the only way I can think of to access the three.js canvas. this means
  // there can only be one per page!
  const canvas = useMemo(() => document.getElementsByTagName("canvas")[0]!, []);

  const currentTool = useIfcStore((state) => state.tool.current);

  const clickListener = useCallback(
    (_: PointerEvent) => {
      if (currentTool !== "select") {
        return;
      }

      if (getCameraMoving()) {
        return;
      }

      raycaster.layers.disableAll();
      raycaster.layers.enable(1);
      const intersected = raycaster.intersectObjects(meshes);
      raycaster.layers.enableAll();

      if (intersected.length === 0) {
        setSelectedElement(null);
        return;
      }

      const object = intersected[0].object;

      if (
        object.userData === undefined ||
        object.userData["element"] === undefined
      ) {
        return;
      }

      const element: IfcElement = object.userData["element"];
      setSelectedElement(selectedElement === element ? null : element);
    },
    [currentTool, raycaster, meshes, setSelectedElement, selectedElement]
  );

  useEffect(() => {
    canvas.addEventListener("click", clickListener);
    return () => canvas.removeEventListener("click", clickListener);
  }, [canvas, clickListener]);

  const clipAlwaysVisible = useIfcStore(
    (state) => state.tool.clip.alwaysVisible
  );
  const clipMatrix = useIfcStore((state) => state.tool.clip.matrix);

  const clippingPlanes = useMemo(() => {
    if (currentTool !== "clip" && !clipAlwaysVisible) {
      return [];
    }
    const zAxis = new Vector3();
    const position = new Vector3();
    clipMatrix.extractBasis(new Vector3(), new Vector3(), zAxis);
    clipMatrix.decompose(position, new Quaternion(), new Vector3());
    return [new Plane(zAxis.negate(), 0).translate(position)];
  }, [clipAlwaysVisible, clipMatrix, currentTool, meshes]);

  useEffect(() => {
    meshes.forEach((mesh) => {
      mesh.material.clippingPlanes = clippingPlanes;
    });
  }, [clippingPlanes, meshes]);

  return null;
};
