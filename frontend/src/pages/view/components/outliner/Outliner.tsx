import { Row } from "@pages/view/components/outliner/Row";
import { useFlatList } from "@pages/view/components/outliner/useFlatList";
import { Panel } from "@pages/view/components/Panel";
import { PanelBody } from "@pages/view/components/PanelBody";
import { PanelHead } from "@pages/view/components/PanelHead";
import { useTranslation } from "react-i18next";
import { List } from "react-window";

export const Outliner = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.outliner.Outliner",
  });

  return (
    <Panel>
      <PanelHead title={t("title")} />
      <PanelBody>
        <Inner />
      </PanelBody>
    </Panel>
  );
};

const Inner = () => {
  const items = useFlatList();
  if (items === null) {
    return null;
  }

  return (
    <List
      rowComponent={Row}
      rowCount={items.length}
      rowHeight={30}
      rowProps={{ items }}
    />
  );
};
