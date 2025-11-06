import { useGetFileElements } from "@api/hooks/useGetFileElements";
import { Content } from "@pages/view/components/Content";
import { Details } from "@pages/view/components/Details";
import { IfcStoreProvider } from "@stores/ifc/Provider";
import { getRouteApi, Navigate } from "@tanstack/react-router";

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
