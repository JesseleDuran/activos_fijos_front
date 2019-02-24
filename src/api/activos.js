import request from "./request";

export const createActivo = activo =>
    request()
        .post("/activos", activo)
        .then(({ data }) => data);

export const updateActivo = (id, filtered) =>
    request()
        .put(`/activos/${id}`, filtered)
        .then(({ data }) => data);        

export const getActivos = ({ page = 0, size = 20, filtered, sorted }) =>
    request()
        .get("/activos", {
            params: {
                page,
                size,
                filtered,
                sorted,
            },
        })
        .then(({ data }) => data);

export const getActivo = id =>
    request()
        .get(`/activos/${id}`)
        .then(({ data }) => data);

export const getActivoByMovimiento = tipo =>
    request()
        .get('/activos/movimiento', {
            params: {
                tipo
            },
        })
        .then(({ data }) => data);

export const getClasification = () =>
    request()
        .get("/activos/clasificaciones")
        .then(({ data }) => data);

export const getBrands = () =>
    request()
        .get("/activos/marcas")
        .then(({ data }) => data);

export const deleteActivo = id =>
    request()
        .delete(`/activos/${id}`)
        .then(({ data }) => data);

export const getOrdenes = () => request().get("/ordenescomprafactura").then(({ data }) => data);

export const getUbications = () => request().get("/ubicacionfisica").then(({ data }) => data);

export const getUbicationsAdmin = () => request().get("/ubicacionadministrativa").then(({ data }) => data);

export const getPersonal = query => request().get("/personal", {
    params: {
        query,
    },
}).then(({ data }) => data);

export const createMovimiento = movimiento => request().post("/movimiento", movimiento).then(({ data }) => data);

export const getMovimiento = id => request().get(`/movimiento/${id}`).then(({ data }) => data);

export const getReporte = (filtered, report_date) => {
    return request().get("/reportes/depreciacion", {
        params: {
            filtered,
            report_date,
        },
    }).then(({ data }) => data);
};
