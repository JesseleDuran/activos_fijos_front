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
                accessor: "ubicacion_administrativa",
            },
            {
                Header: "Departamento",
                accessor: "departamento",
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
                accessor: data => displayDateRightFormat(data.created_at),
            },
            {
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
                accessor: data => displayDateRightFormat(data.fecha_compra),
                width: 140,
            },
            {
                id: "fin_vida_util",
                Header: "Fin de vida útil",
                accessor: data => displayDateRightFormat(data.fin_vida_util),
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
                width: 170
            },
            {
                Header: "Meses depreciados",
                accessor: "meses_depreciados",
                width: 160
            },
            {
                Header: "Depreciación acumulada",
                accessor: "depreciacion_acumulada_meses",
                width: 170
            },
            {
                Header: "Valor neto",
                accessor: "valor_neto",
            },
            {
                Header: "¿Llegó a su fin de vida útil?",
                accessor: "llego_fin",
                width: 220
            }
        ],
    },

];
