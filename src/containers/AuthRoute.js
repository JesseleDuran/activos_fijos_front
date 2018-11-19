import React from "react";
import Route from "containers/Route";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { isLoggedIn } from "../reducers/auth";

const AuthRoute = ({ isLoggedIn, ...rest }) =>
  isLoggedIn ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: "/", state: { from: rest.location } }} />
  );

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
});

const container = compose(
  withRouter,
  connect(mapStateToProps),
);

export default container(AuthRoute);
