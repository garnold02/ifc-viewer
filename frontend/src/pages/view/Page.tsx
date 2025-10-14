import { getRouteApi, Navigate } from "@tanstack/react-router";
import { Content } from "./components/Content";
import { useGetFileElements } from "../../api/hooks/file/elements";
import { IfcStoreProvider } from "../../stores/ifc/Provider";
import { Details } from "./components/details/Details";

const route = getRouteApi("/view/$fileId");

export const Page = () => {
  const { fileId } = route.useLoaderData();

  if (fileId === null) {
    return <Navigate to="/" />;
  }

  return <Inner fileId={fileId} />;
};

const Inner = ({ fileId }: { fileId: number }) => {
  const { data: elements } = useGetFileElements(fileId);

  if (elements === undefined) {
    return null;
  }

  return (
    <IfcStoreProvider fileId={fileId} elements={elements}>
      <Content />
      <Details />
    </IfcStoreProvider>
  );
};
