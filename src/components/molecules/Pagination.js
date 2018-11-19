import React from "react";
import {
  Table,
  TableFooter,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { translateKey } from "utils/translate";

const displayedRows = ({ from, to, count }) =>
  `${from} - ${to} ${translateKey("of")} ${count}`;

const Pagination = ({
  page,
  count,
  onChangePage,
  rowsPerPage,
  onRowsChange,
}) => (
  <Grid container justify="center">
    <Grid item lg={10} xl={5}>
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onRowsChange}
              labelRowsPerPage={translateKey("rowsPerPage")}
              labelDisplayedRows={displayedRows}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Grid>
  </Grid>
);

export default Pagination;
