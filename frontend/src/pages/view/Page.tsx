import { getRouteApi, Navigate } from "@tanstack/react-router";
import { OutlinerStoreProvider } from "../../stores/outliner/Provider";
import { Content } from "./components/Content";
import { IfcContext } from "../../contexts/ifc";
import { ToolStoreProvider } from "../../stores/tool/Provider";

const route = getRouteApi("/view/$ifcId");

export const Page = () => {
  const { ifcId } = route.useLoaderData();

  if (ifcId === null) {
    return <Navigate to="/" />;
  }

  return (
    <IfcContext.Provider value={{ ifcId }}>
      <OutlinerStoreProvider>
        <ToolStoreProvider>
          <Content />
        </ToolStoreProvider>
      </OutlinerStoreProvider>
    </IfcContext.Provider>
  );
};
