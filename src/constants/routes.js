export default [
    {
        icon: "settings",
        label: "Activos",
        items: [
            {
                to: "/activos",
                icon: "plus_one",
                label: "Inventario",
            },
            {
                to: "/crearActivo",
                icon: "plus_one",
                label: "Crear Activo",
            },
            {
                to: "/movimientos",
                icon: "plus_one",
                label: "Crear Movimiento",
            },
        ],
    },
    {
        icon: "settings",
        label: "Reportes",
        items: [
            {
                to: "reportes/depreciacion",
                icon: "plus_one",
                label: "Depreciación",
            }
        ],
    },
    {
        to: "/transacciones",
        icon: "settings",
        label: "Transacciones",
    },
];
