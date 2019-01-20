import store from "store";
import { getAccessToken, getCodemp as getCodempUser } from "../reducers/auth";

export const getToken = () => getAccessToken(store.getState());

export const getCodemp = () => getCodempUser(store.getState());

