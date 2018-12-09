import React from "react";
import Search from "@material-ui/icons/Search";
import Delete from "@material-ui/icons/Close";
import Add from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";

export default (show, remove) => [
    // Follow React-Table Documentation https://react-table.js.org
    {
        Header: "Información General",
        columns: [
            {
                Header: "#",
                accessor: "n_activo",
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
            },
            {
                Header: "Vida Útil (Meses)",
                accessor: "vida_util_meses",
                width: 50,
            },
            {
                Header: "Clasificación",
                accessor: "clasificacion",
            },
        ],
    },
    {
        Header: "Propietario",
        columns: [
            {
                Header: "Cédula",
                accessor: "cedper",
            },
            {
                Header: "Nombre",
                accessor: "nomper",
            },
            {
                Header: "Apellido",
                accessor: "apeper",
            },
        ],
    },
    {
        Header: "Estado Actual",
        accessor: "estado_actual",
        columns: [
            {
                Header: "Estado Actual",
                accessor: "estado_actual",
            },
        ],
    },
    {
        Header: "Datos de compra",
        columns: [
            {
                Header: "Id Orden",
                accessor: "id_soc_ordencompra",
            },
        ],
    },
    {
        Header: "Ubicación",
        columns: [
            {
                Header: "Ubicación Geográfica",
                accessor: "dirubifis",
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
