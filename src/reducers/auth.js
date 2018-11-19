import get from "lodash/get";
import * as constants from "../constants/actions";
import { roles } from "../constants";

export const isLoggedIn = ({ auth }) => auth.isLoggedIn;
export const getAuthError = ({ auth }) => auth.error;
export const getAccessToken = ({ auth }) => auth.accessToken;
export const getUser = ({ auth }) => auth.user;

const ROLES_KEY = "https://integrations-team/app_metadata";

const defaultUserRoles = [roles.USER];

const initialState = {
  isLoggedIn: false,
  user: {
    roles: defaultUserRoles,
  },
  accessToken: "",
  error: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isLoggedIn: false,
      };
    case constants.LOGOUT:
      return initialState;
    case constants.LOGIN_SUCCESS:
      const { accessToken, user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user: {
          ...user,
          roles: get(user[ROLES_KEY], "roles", defaultUserRoles),
        },
        accessToken,
      };
    default:
      return state;
  }
}
