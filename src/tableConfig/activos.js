import React from "react";
import Search from "@material-ui/icons/Search";
import Delete from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { displayDateRightFormat } from "../utils/dates"

export default (show, remove) => [
    // Follow React-Table Documentation https://react-table.js.org
    {
        Header: "Información General",
        columns: [
            {
                Header: "N°",
                accessor: "n_activo",
            },
            {
                id: "created_at::text", // this is done for query filter purpose 
                Header: "Incorporación al sistema",
                accessor: data => displayDateRightFormat(data.created_at)
            },
            {
                Header: "Marca",
                accessor: "marca",
            },
            {
                Header: "Modelo",
                accessor: "modelo",
            },
            {
                Header: "Serial",
                accessor: "serial",
            },
            {
                Header: "Descripción",
                accessor: "descripcion",
                width: 150
            },
            {
                id: "vida_util_meses::text",
                Header: "Vida Útil (Meses)",
                accessor: "vida_util_meses",
                width: 140,
            },
            {
                Header: "Clasificación",
                accessor: "clasificacion",
            }
        ],
    },
    {
        Header: "Estado Actual",
        columns: [
            {
                Header: "Estatus",
                accessor: "estatus",
            },
            {
                Header: "Estado de uso",
                accessor: "condicion",
                width: 120,
            },
            {
                Header: "Observaciones",
                accessor: "observaciones",
            },
        ],
    },
    {
        Header: "Datos de compra",
        columns: [
            {
                Header: "N° Orden de Compra",
                accessor: "numero_orden_compra",
                width: 150
            },
            {
                Header: "N° Factura",
                accessor: "numero_factura",
                width: 150
            },
            {
                id: "siv_articulo.spg_cuenta",
                Header: "Cuenta presupuestaria",
                accessor: "cuenta_presupuestaria",
            },
            {
                id: "soc_ordencompra.coduniadm",
                Header: "Centro de costo",
                accessor: "centro_costo",
            },
            {
                id: "cxp_rd.fecemidoc::text", // this is done for query filter purpose 
                Header: "Fecha de Compra",
                accessor: data => displayDateRightFormat(data.fecha_compra),
                width: 140
            },
            {
                id: "soc_dt_bienes.preuniart::text",
                Header: "Costo",
                accessor: "costo_unitario",
            },
            {
                id: "soc_ordencompra.forpagcom",
                Header: "Condición de pago",
                accessor: "condicion_pago",
                width: 140
            },
            {
                id: "rpc_proveedor.nompro",
                Header: "Proveedor",
                accessor: "nombre_proveedor",
                width: 150
            },
        ],
    },
    {
        Header: "Ubicación",
        columns: [
            {
                Header: "Geográfica",
                accessor: "ubicacion_geografica",
            },
            {
                Header: "Administrativa",
                accessor: "ubicacion_administrativa",
            },
            {
                Header: "Departamento",
                accessor: "departamento",
            },
        ],
    },
    {
        Header: "Usuario",
        columns: [
            {
                Header: "Cédula",
                id: "cedper",
                accessor: data => data.cedula_personal,
            },
            {
                Header: "Nombre",
                id: "nomper",
                accessor: data => data.nombre_personal,
            },
            {
                Header: "Apellido",
                id: "apeper",
                accessor: data => data.apellido_personal,
            },
        ],
    },
    {
        Header: "",
        columns: [
            {
                Header: "",
                accessor: "options",
                filterable: false,
                sortable: false,
                minWidth: 150,
                resizable: false,
                Cell: ({ original }) => (
                    <div>
                        <IconButton onClick={() => show(original)}>
                            <Search style={{ cursor: "pointer" }}/>
                        </IconButton>
                        <IconButton onClick={() => remove(original)}>
                            <Delete
                                style={{ cursor: "pointer", color: "red" }}
                            />
                        </IconButton>
                    </div>
                ),
            },
        ],
    },
];
