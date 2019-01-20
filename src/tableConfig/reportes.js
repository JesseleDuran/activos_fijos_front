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
                Header: "Depreciación mensual",
                accessor: "depreciacion_por_mes",
            },
            {
                Header: "Meses depreciados",
                accessor: "meses_depreciados",
            },
            {
                Header: "Depreciacion acumulada",
                accessor: "depreciacion_acumulada_meses",
            },
            {
                Header: "Valor neto",
                accessor: "valor_neto",
            },
        ],
    },

];
