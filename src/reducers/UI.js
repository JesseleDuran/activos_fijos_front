import * as constants from "../constants/actions";

export const isLoading = ({ UI }) => UI.loading;
export const getError = ({ UI }) => UI.error;

const initialState = {
  loading: false,
  error: null,
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case constants.LOADING:
      return { ...state, loading: action.payload.loading };
    case constants.ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
