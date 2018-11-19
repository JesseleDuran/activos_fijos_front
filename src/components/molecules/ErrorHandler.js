import React from "react";
import translate from "utils/translate";

const ErrorHandler = error =>
  error.response ? (
    <p>{translate(error.response.status)}</p>
  ) : (
    <p>{translate("notNetwork")}</p>
  );

export default ErrorHandler;
