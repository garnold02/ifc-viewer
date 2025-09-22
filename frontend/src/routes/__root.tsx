import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { OutlinerProvider } from "../components/outliner/OutlinerProvider";
import { ToolbarProvider } from "../components/toolbar/ToolbarProvider";

const Root = () => (
  <>
    <OutlinerProvider>
      <ToolbarProvider>
        <Outlet />
      </ToolbarProvider>
    </OutlinerProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: Root,
});
