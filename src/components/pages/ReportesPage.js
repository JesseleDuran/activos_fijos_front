import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/es/Button/Button";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import { Workbook } from "react-excel-workbook";
import tableConfig from "../../tableConfig/reportes";
import MultiSelect from "../molecules/MultiSelect";
import ControlledSelect from "../molecules/Select"
import { ubicacionesToOptions, marcasToOptions, clasificacionesToOptions, ubicacionesAdministrativasToOptions } from "../../utils/functions"

const styles = () => ({});

function getEndOfMonth(monthNumber) {
    const startDate = moment([moment().year(), monthNumber]);
    return moment(startDate).endOf('month').format('YYYY-MM-DD');
}

function monthsToOptions() {
    return moment.months().map((m, index) => ({ label: m, value: getEndOfMonth(index) }));
}

const ReportesPage = ({
                          preview,
                          loading = false,
                          ubicaciones,
                          ubicacionesAdministrativas,
                          clasificaciones,
                          marcas,
                          fecha,
                          selectedUbicaciones,
                          selectedMarcas,
                          selectedClasificaciones,
                          selectedUbicacionesAdministrativas,
                          changeFecha,
                          changeMarcas,
                          changeUbicaciones,
                          changeClasificaciones,
                          changeUbicacionesAdministrativas,
                          apply,
                      }) => (
    <Grid container>
        <Grid item xs={12}>
            <MultiSelect
                label='Ubicación geográfica'
                options={ubicacionesToOptions(ubicaciones)}
                values={selectedUbicaciones}
                onChange={changeUbicaciones}/>
            <MultiSelect
                label='Ubicación Administrativa'
                options={ubicacionesAdministrativasToOptions(ubicacionesAdministrativas)}
                values={selectedUbicacionesAdministrativas}
                onChange={changeUbicacionesAdministrativas}/>    
            <MultiSelect 
                label='Marcas'
                options={marcasToOptions(marcas)}
                values={selectedMarcas}
                onChange={changeMarcas}/>
            <MultiSelect
                label='Clasificaciones'
                options={clasificacionesToOptions(clasificaciones)}
                values={selectedClasificaciones}
                onChange={changeClasificaciones}/>
            <ControlledSelect
                label='Meses'
                options={monthsToOptions()}
                onChange={evt => changeFecha(evt.target.value)}
                value=""
            />

            <Workbook filename="reporte.xlsx" element={<Button disabled={preview.length === 0}>Descargar</Button>}>
                <Workbook.Sheet data={preview} name="Sheet A">
                    <Workbook.Column label="Ubic. Geográfica" value="ubicacion_geografica"/>
                    <Workbook.Column label="Ubic. Administrativa" value="ubicacion_administrativa"/>
                    <Workbook.Column label="Ubic. Departamento" value="departamento"/>
                    <Workbook.Column label="Activo N°" value="n_activo"/>
                    <Workbook.Column label="Marca" value="marca"/>
                    <Workbook.Column label="Modelo" value="modelo"/>
                    <Workbook.Column label="Serial" value="serial"/>
                    <Workbook.Column label="Cuenta Presupuestaria" value="cuenta_presupuestaria"/>
                    <Workbook.Column label="Centro de Costo" value="centro_costo"/>
                    <Workbook.Column label="Descripción" value="descripcion"/>
                    <Workbook.Column label="Fecha de Compra" value="fecha_compra"/>
                    <Workbook.Column label="Vida Útil (Meses)" value="vida_util_meses"/>
                    <Workbook.Column label="Fin de Vida Útil" value="fin_vida_util"/>
                    <Workbook.Column label="Costo (Bs. S)" value="costo_unitario"/>
                    <Workbook.Column label="N° Orden de Compra" value="numero_orden_compra"/>
                    <Workbook.Column label="N° Factura" value="numero_factura"/>
                    <Workbook.Column label="Depreciación mensual" value="depreciacion_por_mes"/>
                    <Workbook.Column label="Meses Depreciados" value="meses_depreciados"/>
                    <Workbook.Column label="Depreciación acumulada" value="depreciacion_acumulada_meses"/>                 
                    <Workbook.Column label="Valor Neto" value="valor_neto"/>
                    <Workbook.Column label="¿Llegó a su fin de vida útil?" value="llego_fin"/>
                </Workbook.Sheet>
            </Workbook>
            <Button onClick={apply} disabled={fecha === null}>Aplicar</Button>
        </Grid>
        <div style={{ width: "100%" }}>
            <ReactTable
                data={preview}
                columns={tableConfig}
                defaultPageSize={10}
                className="-striped -highlight"
                loading={loading} // Display the loading overlay when we need it
                manual
                sortable={false}
            />
        </div>
    </Grid>
);

export default withStyles(styles)(ReportesPage);
