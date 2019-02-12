import React from "react";
import { displayDateRightFormat } from "../utils/dates"

export default [
    // Follow React-Table Documentation https://react-table.js.org
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
        Header: "Información General",
        columns: [
            {
                Header: "N°",
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
                width: 150
            },
            {
                id: "created_at",
                Header: "Incorporación al sistema",
                accessor: created_at => displayDateRightFormat(created_at),
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
        Header: "Datos de compra",
        columns: [
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
                id: "fin_vida_util",
                Header: "Fin de vida útil",
                accessor: fin_vida_util => displayDateRightFormat(fin_vida_util),
            },
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
