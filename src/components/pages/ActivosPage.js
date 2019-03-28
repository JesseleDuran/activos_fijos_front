import React from "react";
import { Workbook } from "react-excel-workbook";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ReactTable from "react-table";
import "react-table/react-table.css";
import tableConfig from "../../tableConfig/activos";
import ActivoModal from "../organisms/ActivoModal";

const styles = () => ({});

const ActivosPage = ({ activos, size, pages = 100, loading = false, onChange, show, remove, activo, close, onChangeUpdate, update, hasChanged, clasificaciones, marcas, downloadCartaDeAsignacion }) => (
    <Grid container>
        <div style={{ width: "100%" }}>
            <Workbook filename="inventario.xlsx" element={<Button style={{ padding: '10px', marginTop: '-45px', marginLeft: '1085px', position: 'absolute'}} variant="contained" color="primary" disabled={activos.length === 0}>Descargar Inventario</Button>}>
                <Workbook.Sheet data={activos} name="Sheet A">
                    <Workbook.Column label="UBICACIÓN GEOGRÁFICA" value="ubicacion_geografica"/>
                    <Workbook.Column label="UBICACIÓN ADMINISTRATIVA" value="ubicacion_administrativa"/>
                    <Workbook.Column label="UBICACIÓN DEPARTAMENTO" value="departamento"/>
                    <Workbook.Column label="USUARIO" value={row => row.nombre_personal ? `${row.nombre_personal} ${row.apellido_personal}` : ''}/>
                    <Workbook.Column label="CÉDULA DE USUARIO" value={row => row.cedula_personal !== null ? `V-${row.cedula_personal}` : ''}/>
                    <Workbook.Column label="N° ACTIVO" value="n_activo"/>
                    <Workbook.Column label="DESCRIPCIÓN" value="descripcion"/>
                    <Workbook.Column label="MARCA" value="marca"/>
                    <Workbook.Column label="MODELO" value="modelo"/>
                    <Workbook.Column label="SERIAL" value="serial"/>
                    <Workbook.Column label="ESTADO DE USO" value="condicion"/>
                    <Workbook.Column label="VIDA ÚTIL (MESES)" value="vida_util_meses"/>
                    <Workbook.Column label="CLASIFICACIÓN" value="clasificacion"/>

                    <Workbook.Column label="OBSERVACIONES" value="observaciones"/>                  
                </Workbook.Sheet>
            </Workbook>
            <ReactTable
                data={activos}
                columns={tableConfig(show, remove)}
                defaultPageSize={size}
                className="-striped -highlight"
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={onChange} // Request new data when things change
                filterable
                sortable={false}
                manual
                  // Text
                previousText='Anterior'
                nextText='Siguiente'
                loadingText='Cargando...'
                noDataText='No activos encontrados'
                pageText='Página'
                ofText='de'
                rowsText='activos'
            />
            <ActivoModal 
                open={activo} 
                activo={activo} 
                close={close} 
                onChange={onChangeUpdate} 
                update={update} 
                hasChanged={hasChanged}
                marcas={marcas}
                clasificaciones={clasificaciones}
                downloadCartaDeAsignacion={downloadCartaDeAsignacion}
            />

        </div>
    </Grid>
);

export default withStyles(styles)(ActivosPage);
