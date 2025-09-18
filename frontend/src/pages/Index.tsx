import { Box, styled } from "@mui/material";
import { OutlinerProvider } from "../components/outliner/OutlinerProvider";
import { Viewport } from "../components/viewport/Viewport";
import { Outliner } from "../components/outliner/Outliner";

export const Index = () => {
  return (
    <OutlinerProvider>
      <Layout>
        <Viewport />
        <Outliner />
      </Layout>
    </OutlinerProvider>
  );
};

const Layout = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 300px;
`;
