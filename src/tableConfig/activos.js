import React from "react";
import Search from "@material-ui/icons/Search";
import Delete from "@material-ui/icons/Close";
import Add from "@material-ui/icons/AddCircleOutline";
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
                id: "created_at",
                Header: "Incorporación al sistema",
                accessor: created_at => displayDateRightFormat(created_at),
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
                Header: "Vida Útil (Meses)",
                accessor: "vida_util_meses",
                width: 50,
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
                Header: "Condición",
                accessor: "condicion",
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
                Header: "Cuenta presupuestaria",
                accessor: "cuenta_presupuestaria",
            },
            {
                Header: "Centro de costo",
                accessor: "centro_costo",
            },
            {
                id: "fecha_compra",
                Header: "Fecha de Compra",
                accessor: fecha_compra => displayDateRightFormat(fecha_compra),
            },
            {
                Header: "Costo",
                accessor: "costo_unitario",
            },
            {
                Header: "Condición de pago",
                accessor: "condicion_pago",
            },
            {
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
                accessor: "unidad_administrativa",
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
