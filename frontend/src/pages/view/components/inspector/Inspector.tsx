import { InspectorHead } from "@pages/view/components/inspector/InspectorHead";
import { Panel } from "@pages/view/components/Panel";
import { PanelBody } from "@pages/view/components/PanelBody";
import { PropertyTree } from "@pages/view/components/property/PropertyTree";

type Props = {
  elementId: number;
};

export const Inspector = ({ elementId }: Props) => {
  return (
    <Panel>
      <InspectorHead elementId={elementId} />
      <PanelBody>
        <PropertyTree elementId={elementId} />
      </PanelBody>
    </Panel>
  );
};
