import { Box, Button, Paper, Stack, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IfcBrowser } from "../components/IfcBrowser";
import { useState } from "react";
import { IfcPreview } from "../components/IfcPreview";
import { useTranslation } from "react-i18next";
import { createLink } from "@tanstack/react-router";

export const IfcList = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: grey[200],
      }}
    >
      <Paper>
        <Stack direction="row" padding={1} gap={1}>
          <Grid>
            <Box sx={{ overflowX: "hidden", overflowY: "scroll" }}>
              <IfcBrowser
                selected={selected}
                onSelectionChanged={setSelected}
              />
            </Box>
            <ButtonLink
              variant="contained"
              to="/view/$ifcId"
              params={{ ifcId: String(selected!) }}
              disabled={selected === null}
            >
              {t("pages.IfcList.open")}
            </ButtonLink>
          </Grid>
          <IfcPreview id={selected} />
        </Stack>
      </Paper>
    </Stack>
  );
};

const Grid = styled(Box)`
  display: grid;
  grid-template-rows: 1fr auto;
  width: 320px;
`;

const ButtonLink = createLink(Button);
