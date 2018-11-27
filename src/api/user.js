import request from "./request";

export const auth = (username, password) =>
    request()
        .post("/user/auth", {
            username,
            password,
        })
        .then(({ data }) => data);
