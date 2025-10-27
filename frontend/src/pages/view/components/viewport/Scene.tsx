import type { Element } from "@api/types/file/element";
import { getCameraMoving } from "@global/camera";
import { useThree } from "@react-three/fiber";
import { useIfcStore } from "@stores/ifc/store";
import { defaultVisibilityOf } from "@utils/visibility";
import { useEffect, useMemo } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  type Intersection,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  type Object3DEventMap,
  Plane,
  Quaternion,
  Vector3,
} from "three";

export const Scene = () => {
  const { gl, scene, raycaster } = useThree();

  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  const allElements = useIfcStore((state) => state.elements);
  const filteredElements = useIfcStore((state) => state.filter.elements);
  const showFilterInViewport = useIfcStore(
    (state) => state.filter.showInViewport
  );

  const elements = useMemo(
    () => (showFilterInViewport ? filteredElements : allElements),
    [allElements, filteredElements, showFilterInViewport]
  );

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
    if (meshes.length > 0) {
      group.add(...meshes);
    }
    scene.add(group);
    return () => {
      scene.remove(group);
    };
  }, [meshes, scene]);

  const selectedElementIds = useIfcStore((state) => state.selection.elementIds);
  const setSelectedElementIds = useIfcStore(
    (state) => state.selection.setElementIds
  );

  const toggleElementSelection = useIfcStore(
    (state) => state.selection.toggleElementSelection
  );

  useEffect(() => {
    meshes.forEach((mesh) => {
      let highlight = false;
      let currentElement: Element = mesh.userData["element"];

      while (true) {
        if (selectedElementIds.includes(currentElement.id)) {
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
  }, [elements, meshes, selectedElementIds]);

  const selfVisibility = useIfcStore((state) => state.outliner.selfVisibility);
  const childrenVisibility = useIfcStore(
    (state) => state.outliner.childrenVisibility
  );

  useEffect(() => {
    meshes.forEach((mesh) => {
      let visible = true;
      let currentElement: Element = mesh.userData["element"];

      const selfVisible =
        currentElement.id in selfVisibility
          ? selfVisibility[currentElement.id]
          : defaultVisibilityOf(currentElement.type);

      if (!selfVisible) {
        visible = false;
      } else {
        while (true) {
          if (currentElement.parent_id === null) {
            break;
          }

          currentElement = elements[currentElement.parent_id];
          const childrenVisible =
            currentElement.id in childrenVisibility
              ? childrenVisibility[currentElement.id]
              : true;

          if (!childrenVisible) {
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
  }, [childrenVisibility, elements, meshes, selfVisibility]);

  // hack: the only way I can think of to access the three.js canvas. this means
  // there can only be one per page!
  const canvas = useMemo(() => document.getElementsByTagName("canvas")[0]!, []);

  const currentTool = useIfcStore((state) => state.tool.current);

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
  }, [clipAlwaysVisible, clipMatrix, currentTool]);

  // not an arrow function because EventListener hates me
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clickListener = function clickListener(
    this: HTMLCanvasElement,
    _event: MouseEvent
  ) {
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

    const notClipped: Intersection<Object3D<Object3DEventMap>>[] = [];

    intersected.forEach((intersection) => {
      if (clippingPlanes.length > 0) {
        const plane = clippingPlanes[0];
        if (plane.distanceToPoint(intersection.point) < 0) {
          return;
        }
      }
      notClipped.push(intersection);
    });

    if (notClipped.length === 0) {
      setSelectedElementIds([]);
      return;
    }

    const object = notClipped[0].object;

    if (
      object.userData === undefined ||
      object.userData["element"] === undefined
    ) {
      return;
    }

    const element: Element = object.userData["element"];
    toggleElementSelection(element.id, true);
  };

  useEffect(() => {
    canvas.addEventListener("click", clickListener);
    return () => canvas.removeEventListener("click", clickListener);
  }, [canvas, clickListener]);

  useEffect(() => {
    meshes.forEach((mesh) => {
      mesh.material.clippingPlanes = clippingPlanes;
    });
  }, [clippingPlanes, meshes]);

  return null;
};
