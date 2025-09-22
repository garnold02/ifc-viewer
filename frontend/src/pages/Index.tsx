import { Divider, styled } from "@mui/material";
import { OutlinerProvider } from "../components/outliner/OutlinerProvider";
import { Viewport } from "../components/viewport/Viewport";
import { Outliner } from "../components/outliner/Outliner";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Inspector } from "../components/inspector/Inspector";
import { Toolbar } from "../components/toolbar/Toolbar";

export const Index = () => {
  return (
    <OutlinerProvider>
      <Layout direction="horizontal">
        <Panel>
          <Toolbar />
          <Divider orientation="horizontal" />
          <Viewport />
        </Panel>
        <PanelResizeHandle>
          <Divider orientation="vertical" />
        </PanelResizeHandle>
        <Panel defaultSize={20} minSize={15} maxSize={30}>
          <PanelGroup direction="vertical">
            <Panel>
              <Outliner />
            </Panel>
            <PanelResizeHandle>
              <Divider orientation="horizontal" />
            </PanelResizeHandle>
            <Panel defaultSize={20} minSize={10} maxSize={40}>
              <Inspector />
            </Panel>
          </PanelGroup>
        </Panel>
      </Layout>
    </OutlinerProvider>
  );
};

const Layout = styled(PanelGroup)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
`;
