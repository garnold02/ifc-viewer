import { Divider } from "@mui/material";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Outliner } from "./Outliner";
import { Toolbar } from "./Toolbar";
import { Viewport } from "./Viewport";
import { Inspector } from "./Inspector";
import styled from "@emotion/styled";

export const IfcViewContent = () => {
  return (
    <StyledPanelGroup direction="horizontal">
      <Panel>
        <Toolbar />
        <Divider orientation="horizontal" />
        <Viewport />
      </Panel>
      <PanelResizeHandle>
        <Divider orientation="vertical" />
      </PanelResizeHandle>
      <Panel defaultSize={25} minSize={20} maxSize={30}>
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
