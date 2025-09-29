import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Viewport } from "./Viewport";
import { Outliner } from "./Outliner";
import { Inspector } from "./Inspector";
import { ToolBar } from "./ToolBar";

export const Content = () => {
  return (
    <StyledPanelGroup direction="horizontal">
      <Panel>
        <ToolBar />
        <Divider orientation="horizontal" />
        <Viewport />
      </Panel>
      <PanelResizeHandle>
        <Divider orientation="vertical" />
      </PanelResizeHandle>
      <Panel defaultSize={30} minSize={20} maxSize={50}>
        <PanelGroup direction="vertical">
          <Panel>
            <Outliner />
          </Panel>
          <PanelResizeHandle>
            <Divider orientation="horizontal" />
          </PanelResizeHandle>
          <Panel defaultSize={30} minSize={20} maxSize={60}>
            <Inspector />
          </Panel>
        </PanelGroup>
      </Panel>
    </StyledPanelGroup>
  );
};

const StyledPanelGroup = styled(PanelGroup)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
`;
