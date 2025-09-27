import { getRouteApi, Navigate } from "@tanstack/react-router";
import { IfcContext } from "../contexts/ifc";
import { IfcViewContent } from "../components/IfcViewContent";
import { OutlinerStoreProvider } from "../stores/OutlinerStoreProvider";
import { ToolStoreProvider } from "../stores/ToolStoreProvider";

const route = getRouteApi("/view/$ifcId");

export const IfcView = () => {
  const { ifcId } = route.useLoaderData();

  if (ifcId === null) {
    return <Navigate to="/" />;
  }

  return (
    <IfcContext.Provider value={{ ifcId }}>
      <OutlinerStoreProvider>
        <ToolStoreProvider>
          <IfcViewContent />
        </ToolStoreProvider>
      </OutlinerStoreProvider>
    </IfcContext.Provider>
  );
};
