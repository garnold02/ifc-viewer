import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useGetIfcPreview } from "../api/queries/ifcPreview";
import { IfcCanvas } from "./IfcCanvas";
import { IfcPreviewGeometry } from "./IfcPreviewGeometry";
import { ViewportUprightGroup } from "./ViewportUprightGroup";
import { IfcSceneLight } from "./IfcSceneLight";
import { OrbitControls } from "@react-three/drei";
import { useTranslation } from "react-i18next";

type Props = {
  id: number | null;
};

const WIDTH = 640;
const HEIGHT = 480;

export const IfcPreview = ({ id }: Props) => {
  const { t } = useTranslation();
  const { data: geometries } = useGetIfcPreview(id);

  if (id === null) {
    return (
      <Paper>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ width: WIDTH, height: HEIGHT }}
        >
          <Typography
            color="textDisabled"
            fontStyle="italic"
            sx={{ userSelect: "none" }}
          >
            {t("components.IfcPreview.none_selected")}
          </Typography>
        </Stack>
      </Paper>
    );
  }

  if (geometries === undefined) {
    return (
      <Paper>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ width: WIDTH, height: HEIGHT }}
        >
          <CircularProgress />
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper>
      <IfcCanvas style={{ width: WIDTH, height: HEIGHT, borderRadius: 4 }}>
        <ViewportUprightGroup>
          {geometries !== undefined
            ? geometries.map((geometry, i) => (
                <IfcPreviewGeometry key={i} geometry={geometry} />
              ))
            : null}
        </ViewportUprightGroup>
        <IfcSceneLight />
        <OrbitControls dampingFactor={0.5} makeDefault />
      </IfcCanvas>
    </Paper>
  );
};
