import * as constants from "../constants/actions";
import { showError } from "./UI";

//TODO LOGIN!
export const login = (user, password) => dispatch => {
  if (user == "admin" && password == "admin") {
    dispatch(
      setAuth({
        accessToken: "12344",
        user: {
          name: "Admin",
        },
      }),
    );
  } else {
    dispatch(showError("Usuario o Password Incorrecta"));
  }
};

export const autoAuth = () => dispatch => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("accessToken");

  if (user && accessToken) {
    dispatch(loginSuccess({ accessToken, user }));
    dispatch(setAuth({ accessToken, user }));
  }
};

export const setAuth = ({ accessToken, user }) => dispatch => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("user", JSON.stringify(user));
  dispatch(loginSuccess({ accessToken, user }));
};

const loginSuccess = payload => dispatch => {
  dispatch({
    type: constants.LOGIN_SUCCESS,
    payload,
  });
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
