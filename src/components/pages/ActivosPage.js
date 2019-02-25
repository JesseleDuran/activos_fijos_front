import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ReactTable from "react-table";
import "react-table/react-table.css";
import tableConfig from "../../tableConfig/activos";
import ActivoModal from "../organisms/ActivoModal";

const styles = () => ({});

const ActivosPage = ({ activos, size, pages = 100, loading = false, onChange, show, remove, activo, close, onChangeUpdate, update, hasChanged }) => (
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
            />
            <ActivoModal 
                open={activo} 
                activo={activo} 
                close={close} 
                onChange={onChangeUpdate} 
                update={update} 
                hasChanged={hasChanged} 
            />
        </div>
    </Grid>
);

export default withStyles(styles)(ActivosPage);
