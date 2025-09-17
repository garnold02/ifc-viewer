import {
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import type { IfcHierarchyNode } from "../../types/ifc";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useOutlinerStore } from "./store";
import { useCallback, useMemo } from "react";
import { useGetGeometries } from "../../api/queries/useGetGeometries";
import { defaultVisibilityOf } from "../../utils/ifc";

type Props = {
  data: IfcHierarchyNode;
};

export const OutlinerNode = ({ data }: Props) => {
  const expandedIds = useOutlinerStore((state) => state.expandedIds);
  const expand = useOutlinerStore((state) => state.expand);
  const collapse = useOutlinerStore((state) => state.collapse);

  const isExpanded = useMemo(
    () => expandedIds.includes(data.id),
    [data.id, expandedIds]
  );

  const onArrowClick = useCallback(() => {
    if (isExpanded) {
      collapse(data.id);
    } else {
      expand(data.id);
    }
  }, [collapse, data.id, expand, isExpanded]);

  const { data: geometries } = useGetGeometries();
  const hasGeometry = useMemo(
    () =>
      geometries !== undefined
        ? geometries.some((geometry) => geometry.id === data.id)
        : false,
    [data.id, geometries]
  );

  const defaultVisibility = useMemo(
    () => (hasGeometry ? defaultVisibilityOf(data.type) : true),
    [data.type, hasGeometry]
  );

  const visibilityStates = useOutlinerStore((state) => state.visibilityStates);
  const show = useOutlinerStore((state) => state.show);
  const hide = useOutlinerStore((state) => state.hide);

  const isVisible = useMemo(
    () =>
      visibilityStates.find((vs) => vs.id === data.id)?.visible ??
      defaultVisibility,
    [data.id, defaultVisibility, visibilityStates]
  );

  const onCheckboxClick = useCallback(() => {
    if (isVisible) {
      hide(data.id);
    } else {
      show(data.id);
    }
  }, [hide, isVisible, show]);

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        <IconButton
          size="small"
          onClick={onArrowClick}
          sx={{ visibility: data.children.length > 0 ? "initial" : "hidden" }}
        >
          {isExpanded ? (
            <KeyboardArrowDownIcon fontSize="small" />
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
        <Tooltip
          title={
            data.name !== null && data.name.length > 0 ? data.name : "Unnamed"
          }
        >
          <Typography>{data.type}</Typography>
        </Tooltip>
      </Stack>
      {isExpanded ? (
        <Stack paddingLeft={1}>
          {data.children.map((child) => (
            <OutlinerNode key={child.id} data={child} />
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
};
