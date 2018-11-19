import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import { autoAuth, logout } from "actions/auth";
import Route from "./Route";
import Activos from "./Activos";
import AuthRoute from "./AuthRoute";
import { getHostname } from "utils/functions";
import config from "config";
import PageLoader from "PageLoader";

class App extends Component {
  componentWillMount = () => {
    this.props.autoAuth();
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <AuthRoute exact path="/activos" component={Activos}/>
            <Route exact path="/" component={LoginPage} />
            <Route
              path="/logout"
              component={() => {
                this.props.logout();
                window.location = `/`;
                return <PageLoader active />;
              }}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default connect(
  null,
  {
    autoAuth,
    logout,
  },
)(App);
