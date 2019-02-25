import React, { Component } from "react";
import _get from "lodash/get";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "actions/auth";
import LoginPage from "../components/pages/LoginPage";
import { isLoggedIn } from "../reducers/auth";
import { getError } from "../reducers/UI";

class LoginPageContainer extends Component {
  	render() {
    	const { isLoggedIn, login, error } = this.props;
    	const location = this.props.location;
    	const path = _get(location, "state.from.pathname", "/activos");
    	return isLoggedIn ? (
      		<Redirect to={path} />
    	) : (
      	<LoginPage onLogin={login} error={error} />
   	 	);
  	}
}

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
  error: getError(state),
});

export default connect(
  mapStateToProps,
  { login },
)(LoginPageContainer);
