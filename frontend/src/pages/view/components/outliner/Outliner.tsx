import { CircularProgress } from "@mui/material";
import { useIfcContext } from "../../../../contexts/ifc";
import { useGetIfcRootNode } from "../../../../api/queries/ifcRootNode";
import { Node } from "./Node";
import { useTranslation } from "react-i18next";
import { Panel } from "../Panel";
import { PanelHead } from "../PanelHead";
import { PanelBody } from "../PanelBody";

export const Outliner = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.Outliner",
  });

  const { ifcId } = useIfcContext();
  const { data: rootNode } = useGetIfcRootNode(ifcId);

  return (
    <Panel>
      <PanelHead title={t("title")} />
      <PanelBody>
        {rootNode !== undefined ? (
          <Node node={rootNode} />
        ) : (
          <CircularProgress />
        )}
      </PanelBody>
    </Panel>
  );
};
