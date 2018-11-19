import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import { I18nextProvider } from "react-i18next";
import i18n from "utils/i18n";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import App from "./containers/App";
import theme from "./theme";
import store from "./store";

injectGlobal``;

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
