import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { translateKey } from "utils/translate";
import ReactTable from "react-table";
import "react-table/react-table.css";
import tableConfig from "../../tableConfig/reportes";
import MultiSelect from "../molecules/MultiSelect";
import TextField from "@material-ui/core/TextField/TextField";
import moment from "moment";

const styles = theme => ({});

function ubicacionesToOptions(ubicaciones) {
    return ubicaciones.map(u => {
        return {
            value: u.codubifis,
            label: u.desubifis,
        };
    });
}

function marcasToOptions(marcas) {
    return marcas.map(m => ({ label: m, value: m }));
}

function clasificacionesToOptions(clasificaciones) {
    return clasificaciones.map(m => ({ label: m, value: m }));
}

const ReportesPage = ({
                          preview,
                          page, loading = false,
                          ubicaciones,
                          clasificaciones,
                          marcas,
                          fecha,
                          selectedUbicaciones,
                          selectedMarcas,
                          selectedClasificaciones,
                          changeFecha,
                          changeMarcas,
                          changeUbicaciones,
                          changeClasificaciones,
                      }) => (
    <Grid container>
        <Grid item xs={12}>
            <MultiSelect
                options={ubicacionesToOptions(ubicaciones)}
                values={selectedUbicaciones}
                onChange={changeUbicaciones}/>
            <MultiSelect options={marcasToOptions(marcas)}
                         values={selectedMarcas}
                         onChange={changeMarcas}/>
            <MultiSelect
                options={clasificacionesToOptions(clasificaciones)}
                values={selectedClasificaciones}
                onChange={changeClasificaciones}/>
            <TextField
                id="datetime-local"
                label="Fecha"
                fullWidth
                type="date"
                value={fecha}
                inputProps={{
                    min: moment()
                }}
                onChange={evt => changeFecha(evt.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>
        <div style={{ width: "100%" }}>
            <ReactTable
                data={preview}
                columns={tableConfig}
                defaultPageSize={10}
                className="-striped -highlight"
                loading={loading} // Display the loading overlay when we need it
                manual
            />
        </div>
    </Grid>
);

export default withStyles(styles)(ReportesPage);
