let cameraMoving = false;

export const getCameraMoving = () => {
  return cameraMoving;
};

export const setCameraMoving = (value: boolean) => {
  cameraMoving = value;
};
