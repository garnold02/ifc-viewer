import { Row } from "@pages/view/components/outliner/Row";
import { useFlatList } from "@pages/view/components/outliner/useFlatList";
import { List } from "react-window";

export const Items = () => {
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
