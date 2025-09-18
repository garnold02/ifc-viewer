import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { useGetOutlinerNodeInfo } from "../../api/queries/outliner/useGetOutlinerNodeInfo";
import { OutlinerExpandButton } from "./OutlinerExpandButton";
import { useCallback, useMemo } from "react";
import { useOutlinerStore } from "./store";
import { useGetOutlinerNodeChildren } from "../../api/queries/outliner/useGetOutlinerNodeChildren";
import { OutlinerVisibilityButton } from "./OutlinerVisibilityButton";
import { defaultVisibilityOf } from "../../utils/ifc";

type Props = {
  id: number;
};

export const OutlinerNode = ({ id }: Props) => {
  const expandedIds = useOutlinerStore((state) => state.expandedIds);
  const visibilityStates = useOutlinerStore((state) => state.visibilityStates);
  const expand = useOutlinerStore((state) => state.expand);
  const collapse = useOutlinerStore((state) => state.collapse);
  const show = useOutlinerStore((state) => state.show);
  const hide = useOutlinerStore((state) => state.hide);

  const isExpanded = useMemo(() => expandedIds.includes(id), [expandedIds, id]);
  const { data: info } = useGetOutlinerNodeInfo(id);
  const { data: childIds } = useGetOutlinerNodeChildren(isExpanded ? id : null);

  const expandState = useMemo(
    () =>
      isExpanded
        ? childIds !== undefined
          ? "expanded"
          : "loading"
        : "collapsed",
    [childIds, isExpanded]
  );

  const onExpandClick = useCallback(
    () => (isExpanded ? collapse(id) : expand(id)),
    [collapse, expand, id, isExpanded]
  );

  const visible = useMemo(
    () =>
      visibilityStates.find((vs) => vs.id === id)?.visible ??
      (info !== undefined ? defaultVisibilityOf(info.type) : false),
    [info, visibilityStates]
  );

  const onVisibilityClick = useCallback(
    () => (visible ? hide(id) : show(id)),
    [hide, id, show, visible]
  );

  if (info === undefined) {
    return null;
  }

  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center">
        <OutlinerExpandButton
          state={expandState}
          onClick={onExpandClick}
          disabled={!info.has_children}
        />
        {info.name !== null && info.name.length > 0 ? (
          <Tooltip title={info.name}>
            <Typography>{info.type}</Typography>
          </Tooltip>
        ) : (
          <Typography>{info.type}</Typography>
        )}
        <Box marginLeft="auto" />
        <OutlinerVisibilityButton value={visible} onClick={onVisibilityClick} />
      </Stack>
      {childIds !== undefined && childIds !== null ? (
        <Stack direction="column" paddingLeft={1}>
          {childIds.map((childId) => (
            <OutlinerNode key={childId} id={childId} />
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
};
