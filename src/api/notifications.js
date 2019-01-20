import request from "./request";

export const getNotifications = () =>
    request()
        .get("/notificaciones")
        .then(({ data }) => data);