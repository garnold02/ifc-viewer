import { useTranslation } from "react-i18next";
import { useIfcContext } from "../../../contexts/ifc";
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

export const FileInfo = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "pages.view.components.FileInfo",
  });

  const { ifcId } = useIfcContext();
  const { data: summary } = useGetIfcSummary(ifcId);

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
