import { VisibilityToggle } from "@components/VisibilityToggle";
import { Box, Stack, Typography } from "@mui/material";
import { ExpandButton } from "@pages/view/components/outliner/ExpandButton";
import type { FlatListItem } from "@pages/view/components/outliner/useFlatList";
import { useIfcStore } from "@stores/ifc/store";
import { useElementChildrenVisible } from "@stores/ifc/useElementChildrenVisible";
import { useElementExpanded } from "@stores/ifc/useElementExpanded";
import { useElementSelected } from "@stores/ifc/useElementSelected";
import { useElementSelfVisible } from "@stores/ifc/useElementSelfVisible";
import { useElementSetChildrenVisible } from "@stores/ifc/useElementSetChildrenVisible";
import { useElementSetExpanded } from "@stores/ifc/useElementSetExpanded";
import { useElementSetSelfVisible } from "@stores/ifc/useElementSetSelfVisible";
import { type CSSProperties, useCallback, useMemo } from "react";
import type { RowComponentProps } from "react-window";

type Props = RowComponentProps<{ items: FlatListItem[] }>;

export const Row = ({ index, items, style }: Props) => {
  const item = useMemo(() => items[index], [index, items]);
  return <Item item={item} style={style} />;
};

type ItemProps = {
  item: FlatListItem;
  style: CSSProperties;
};

const Item = ({ item, style }: ItemProps) => {
  const filteredElements = useIfcStore((state) => state.filter.elements);
  const selected = useElementSelected(item.element.id);
  const expanded = useElementExpanded(item.element.id);
  const setExpanded = useElementSetExpanded(item.element.id);
  const selfVisible = useElementSelfVisible(item.element.id);
  const setSelfVisible = useElementSetSelfVisible(item.element.id);
  const childrenVisible = useElementChildrenVisible(item.element.id);
  const setChildrenVisible = useElementSetChildrenVisible(item.element.id);

  const toggleSelectElement = useIfcStore(
    (state) => state.selection.toggleElementSelection
  );

  const onClick = useCallback(
    () => toggleSelectElement(item.element.id, true),
    [item.element.id, toggleSelectElement]
  );

  const expandButtonVisible = useMemo(
    () =>
      item.element.child_ids.length > 0 &&
      item.element.child_ids.some((childId) => childId in filteredElements),
    [filteredElements, item.element.child_ids]
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      paddingLeft={item.level}
      style={style}
    >
      <ExpandButton
        value={expanded}
        onChange={setExpanded}
        visible={expandButtonVisible}
      />
      <Typography
        onClick={onClick}
        color={selected ? "primary" : undefined}
        sx={{ userSelect: "none" }}
        noWrap
      >
        {item.element.type}
      </Typography>
      {item.element.name !== null ? (
        <Typography
          variant="caption"
          onClick={onClick}
          color={selected ? "primary" : "textSecondary"}
          marginLeft={1}
          sx={{ userSelect: "none" }}
          noWrap
        >
          {item.element.name}
        </Typography>
      ) : null}
      <Box flexGrow={1} />
      <VisibilityToggle
        value={selfVisible}
        onChange={setSelfVisible}
        disabled={item.element.geometry === null}
      />
      <VisibilityToggle
        value={childrenVisible}
        onChange={setChildrenVisible}
        disabled={item.element.child_ids.length === 0}
      />
    </Stack>
  );
};
