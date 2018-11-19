import ErrorHandler from "ErrorHandler";
import * as constants from "../constants/actions";

export const loading = loading => dispatch => {
  dispatch({
    type: constants.LOADING,
    payload: {
      loading,
    },
  });
};

export const showError = error => dispatch => {
  dispatch({
    type: constants.ERROR,
    payload: {
      error,
    },
  });

  setTimeout(() => {
    dispatch({
      type: constants.ERROR,
      payload: {
        error: null,
      },
    });
  }, 1000);
};

export const showRequestError = error => dispatch => {
  dispatch(showError(ErrorHandler(error)));
};
