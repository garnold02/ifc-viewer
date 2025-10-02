import { useTranslation } from "react-i18next";
import { Panel } from "./Panel";
import { PanelHead } from "./PanelHead";
import { PanelBody } from "./PanelBody";
import { useGetIfcSummary } from "../../../api/queries/ifcSummary";
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useIfcStore } from "../../../stores/ifc/store";

export const FileInfo = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.FileInfo",
  });

  const fileId = useIfcStore((state) => state.fileId);
  const { data: summary } = useGetIfcSummary(fileId);

  return (
    <Panel>
      <PanelHead title={t("title")}>
        {summary !== undefined ? (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ userSelect: "none" }}
            noWrap
          >
            {summary.name}
          </Typography>
        ) : null}
      </PanelHead>
      <PanelBody>
        {summary !== undefined ? (
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{t("name")}</TableCell>
                  <TableCell>{summary.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t("schema")}</TableCell>
                  <TableCell>{summary.schema}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <LinearProgress />
        )}
      </PanelBody>
    </Panel>
  );
};
