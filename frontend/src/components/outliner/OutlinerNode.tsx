import {
  Checkbox,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useOutlinerStore } from "./store";
import { useCallback, useMemo } from "react";
import { defaultVisibilityOf } from "../../utils/ifc";
import { useGetGeometryList } from "../../api/queries/geometry/useGetGeometryList";
import { useGetOutlinerNodeInfo } from "../../api/queries/outliner/useGetOutlinerNodeInfo";
import { useGetOutlinerNodeChildren } from "../../api/queries/outliner/useGetOutlinerNodeChildren";

type Props = {
  id: number;
};

export const OutlinerNode = ({ id }: Props) => {
  const expandedIds = useOutlinerStore((state) => state.expandedIds);
  const expand = useOutlinerStore((state) => state.expand);
  const collapse = useOutlinerStore((state) => state.collapse);
  const isExpanded = useMemo(() => expandedIds.includes(id), [expandedIds, id]);

  const onArrowClick = useCallback(() => {
    if (isExpanded) {
      collapse(id);
    } else {
      expand(id);
    }
  }, [collapse, expand, id, isExpanded]);

  const { data: geometryIds } = useGetGeometryList();
  const hasGeometry = useMemo(
    () =>
      geometryIds !== undefined
        ? geometryIds.some((geometryId) => geometryId === id)
        : false,
    [geometryIds, id]
  );

  const { data: info } = useGetOutlinerNodeInfo(id);
  const defaultVisibility = useMemo(() => {
    if (info === undefined) {
      return false;
    }
    if (hasGeometry) {
      return defaultVisibilityOf(info.type);
    }
    return true;
  }, [hasGeometry, info]);

  const visibilityStates = useOutlinerStore((state) => state.visibilityStates);
  const show = useOutlinerStore((state) => state.show);
  const hide = useOutlinerStore((state) => state.hide);

  const isVisible = useMemo(
    () =>
      visibilityStates.find((vs) => vs.id === id)?.visible ?? defaultVisibility,
    [defaultVisibility, id, visibilityStates]
  );

  const onCheckboxClick = useCallback(() => {
    if (isVisible) {
      hide(id);
    } else {
      show(id);
    }
  }, [hide, id, isVisible, show]);

  const { data: children } = useGetOutlinerNodeChildren(isExpanded ? id : null);

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        <IconButton size="small" onClick={onArrowClick}>
          {isExpanded ? (
            children !== undefined ? (
              <KeyboardArrowDownIcon fontSize="small" />
            ) : (
              <CircularProgress size="small" />
            )
          ) : (
            <KeyboardArrowRightIcon fontSize="small" />
          )}
        </IconButton>
        <Checkbox
          size="small"
          checked={hasGeometry ? isVisible : true}
          onClick={onCheckboxClick}
          disabled={!hasGeometry}
        />
        {info !== undefined ? (
          <Tooltip
            title={
              info.name !== null && info.name.length > 0 ? info.name : "Unnamed"
            }
          >
            <Typography>{info.type}</Typography>
          </Tooltip>
        ) : (
          <CircularProgress />
        )}
      </Stack>
      {isExpanded && children !== undefined && children !== null ? (
        <Stack paddingLeft={1}>
          {children.map((childId) => (
            <OutlinerNode key={childId} id={childId} />
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
};
