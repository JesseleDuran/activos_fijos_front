export default [
    {
        icon: "home",
        label: "Activos",
        items: [
            {
                to: "/activos",
                icon: "picture_in_picture_alt",
                label: "Inventario",
            },
            {
                to: "/crearActivo",
                icon: "add",
                label: "Crear Activo",
            },
            {
                to: "/movimientos",
                icon: "cached",
                label: "Crear Movimiento",
            },
            {
                to: "/notificaciones",
                icon: "notifications",
                label: "Notificaciones",
            },
        ],
    },
    {
        icon: "equalizer",
        label: "Reportes",
        items: [
            {
                to: "/reportes",
                icon: "trending_down",
                label: "Depreciación",
            },
        ]
    },
    {
        to: "/transacciones",
        icon: "swap_horiz",
        label: "Transacciones",
    },
];
