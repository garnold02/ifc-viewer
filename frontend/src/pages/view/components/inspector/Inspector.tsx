import type { Element } from "../../../../api/types/file/element";

type Props = {
  element: Element;
};

export const Inspector = ({ element }: Props) => {
  return null;
  // const fileId = useIfcStore((state) => state.fileId);
  // const { data: propertySets } = useGetIfcPropertySets(fileId, element.id);
  // return (
  //   <Panel>
  //     <InspectorHead element={element} />
  //     <PanelBody>
  //       <Attributes key="attributes" id={element.id} />
  //       {propertySets !== undefined ? (
  //         propertySets.map((propertySet, i) => (
  //           <PropertySet
  //             key={`${propertySet.name}-${i}`}
  //             propertySet={propertySet}
  //             ordinal={i + 1}
  //           />
  //         ))
  //       ) : (
  //         <LinearProgress />
  //       )}
  //     </PanelBody>
  //   </Panel>
  // );
};
