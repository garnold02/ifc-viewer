import { Element } from "@pages/view/components/outliner/Element";
import { PanelBody } from "@pages/view/components/PanelBody";
import { PanelHead } from "@pages/view/components/PanelHead";
import { useIfcStore } from "@stores/ifc/store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Panel } from "react-resizable-panels";

export const Outliner = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.Outliner",
  });

  const elements = useIfcStore((state) => state.elements);
  const rootElement = useMemo(
    () =>
      Object.values(elements).find((element) => element.parent_id === null)!,
    [elements]
  );

  return (
    <Panel>
      <PanelHead title={t("title")} />
      <PanelBody>
        <Element element={rootElement} />
      </PanelBody>
    </Panel>
  );
};
