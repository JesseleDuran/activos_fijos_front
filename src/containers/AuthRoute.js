import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Route from "./Route";
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
