import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import LoginForm from "LoginForm";
import translate, { translateKey } from "utils/translate";
import ErrorSnackBar from "ErrorSnackBar";
import ReactTable from "react-table";
import "react-table/react-table.css";

const styles = theme => ({});

const ActivosPage = () => (
  <Grid container>
    <div style={{ width: "100%" }}>
      <ReactTable
        data={[]}
        columns={[
          {
            Header: "Name",
            columns: [
              {
                Header: "First Name",
                accessor: "firstName",
              },
              {
                Header: "Last Name",
                id: "lastName",
                accessor: d => d.lastName,
              },
            ],
          },
          {
            Header: "Info",
            columns: [
              {
                Header: "Age",
                accessor: "age",
              },
              {
                Header: "Status",
                accessor: "status",
              },
            ],
          },
          {
            Header: "Stats",
            columns: [
              {
                Header: "Visits",
                accessor: "visits",
              },
            ],
          },
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  </Grid>
);

export default withStyles(styles)(ActivosPage);
