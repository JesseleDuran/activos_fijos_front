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
            {
                to: "/reportes",
                icon: "plus_one",
                label: "Generar Reportes",
            },
            {
                to: "/notificaciones",
                icon: "plus_one",
                label: "Notificaciones",
            },
        ],
    },
    {
        to: "/transacciones",
        icon: "settings",
        label: "Transacciones",
    },
];
