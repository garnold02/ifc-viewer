import { useTranslation } from "react-i18next";
import { Panel } from "../Panel";
import { PanelHead } from "../PanelHead";
import { PanelBody } from "../PanelBody";
import { useIfcStore } from "../../../../stores/ifc/store";
import { useMemo } from "react";
import { Element } from "./Element";

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
