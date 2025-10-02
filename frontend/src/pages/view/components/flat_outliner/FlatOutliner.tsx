import { useIfcContext } from "../../../../contexts/ifc";
import { useTranslation } from "react-i18next";
import { Panel } from "../Panel";
import { PanelHead } from "../PanelHead";
import { PanelBody } from "../PanelBody";
import { useGetIfcElements } from "../../../../api/queries/ifcElements";
import { Content } from "./Content";

export const FlatOutliner = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.Outliner",
  });

  const { ifcId } = useIfcContext();
  const { data: elements } = useGetIfcElements(ifcId);

  return (
    <Panel>
      <PanelHead title={t("title")} />
      <PanelBody>
        <Content elements={elements ?? null} />
      </PanelBody>
    </Panel>
  );
};
