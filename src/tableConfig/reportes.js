import React from "react";

export default [
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
        Header: "Depreciacion",
        columns: [
            {
                Header: "Vida util Faltante en meses",
                accessor: "vida_util_faltante_meses",
            },
            {
                Header: "Depreciacion Acumulado en meses",
                accessor: "depreciacion_acumulada_meses",
            },
            {
                Header: "Depreciacion por mes",
                accessor: "depreciacion_por_mes",
            },
        ],
    },

];
