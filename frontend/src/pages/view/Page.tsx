import { getRouteApi, Navigate } from "@tanstack/react-router";
import { Content } from "./components/Content";
import { useGetIfcElements } from "../../api/queries/ifcElements";
import { IfcStoreProvider } from "../../stores/ifc/Provider";

const route = getRouteApi("/view/$fileId");

export const Page = () => {
  const { fileId } = route.useLoaderData();
  const { data: elements } = useGetIfcElements(fileId);

  if (fileId === null) {
    return <Navigate to="/" />;
  }

  if (elements === undefined) {
    return null;
  }

  return (
    <IfcStoreProvider fileId={fileId} elements={elements}>
      <Content />
    </IfcStoreProvider>
  );
};
