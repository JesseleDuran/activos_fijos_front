import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import translate, { translateKey } from "utils/translate";
import ReactTable from "react-table";
import "react-table/react-table.css";
import tableConfig from "../../tableConfig/activos";

const styles = theme => ({});

const ActivosPage = ({ activos, page, size, pages = 100, loading = false, onChange, show, remove }) => (
    <Grid container>
        <div style={{ width: "100%" }}>
            <ReactTable
                data={activos}
                columns={tableConfig(show, remove)}
                defaultPageSize={size}
                className="-striped -highlight"
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={onChange} // Request new data when things change
                filterable
                manual
                className="-striped -highlight"
            />
        </div>
    </Grid>
);

export default withStyles(styles)(ActivosPage);
