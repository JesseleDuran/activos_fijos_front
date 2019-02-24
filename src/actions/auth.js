import * as constants from "../constants/actions";
import { showError } from "./UI";
import { auth } from "../api/user";

const loginSuccess = payload => dispatch => {
    dispatch({
        type: constants.LOGIN_SUCCESS,
        payload,
    });
};

export const setAuth = ({ accessToken, user }) => dispatch => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(loginSuccess({ accessToken, user }));
};

export const login = (username, password) => dispatch => {
    auth(username, password)
        .then(data => {
            dispatch(
                setAuth({
                    accessToken: data.token,
                    user: data.user,
                }),
            );
        })
        .catch(() => dispatch(showError("Usuario o Password Incorrecta")));
};

export const autoAuth = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("accessToken");

    if (user && accessToken) {
        dispatch(loginSuccess({ accessToken, user }));
        dispatch(setAuth({ accessToken, user }));
    }
};

export const loginFail = error => dispatch => {
    dispatch({
        type: constants.LOGIN_FAIL,
        payload: { error },
    });
};

export const logout = () => dispatch => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("user");
    localStorage.removeItem("country");
};
