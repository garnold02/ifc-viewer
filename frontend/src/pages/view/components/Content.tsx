import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Outliner } from "./outliner/Outliner";
import { ToolBar } from "./toolbar/ToolBar";
import { ActionPanel } from "./ActionPanel";
import { Viewport } from "./viewport/Viewport";

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
      <Panel defaultSize={30} minSize={20} maxSize={80}>
        <PanelGroup direction="vertical">
          <Panel>
            <Outliner />
          </Panel>
          <PanelResizeHandle>
            <Divider orientation="horizontal" />
          </PanelResizeHandle>
          <Panel defaultSize={30} minSize={20} maxSize={80}>
            <ActionPanel />
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
