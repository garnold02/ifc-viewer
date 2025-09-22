import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOutlinerStore } from "../outliner/store";
import { useGetAttributes } from "../../api/queries/attributes/useGetAttributes";

export const InspectorAttributes = () => {
  const { t } = useTranslation();
  const selectedNodeId = useOutlinerStore((state) => state.selectedNodeId);
  const { data: attributes } = useGetAttributes(selectedNodeId);

  if (attributes === undefined) {
    return <CircularProgress />;
  }

  if (attributes === null) {
    return <Typography>SORRY NOTHING</Typography>;
  }

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table>
        <TableBody>
          {attributes.map((attribute) => (
            <TableRow>
              <TableCell>{attribute.name}</TableCell>
              <TableCell>{String(attribute.value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
