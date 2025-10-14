import { Panel } from "../Panel";
import { PanelBody } from "../PanelBody";
import { PropertyTree } from "../property/PropertyTree";
import { InspectorHead } from "./InspectorHead";

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
