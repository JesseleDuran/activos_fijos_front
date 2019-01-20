import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import { autoAuth, logout } from "actions/auth";
import Route from "./Route";
import Activos from "./Activos";
import AuthRoute from "./AuthRoute";
import PageLoader from "PageLoader";
import CrearActivos from "./CrearActivos";
import Movimientos from "./Movimientos";
import Reportes from "./Reportes";
import Notifications from "./Notifications"

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
                        <AuthRoute exact path="/crearActivo" component={CrearActivos}/>
                        <AuthRoute exact path="/movimientos" component={Movimientos}/>
                        <AuthRoute exact path="/reportes" component={Reportes}/>
                        <AuthRoute exact path="/notificaciones" component={Notifications}/>
                        <Route exact path="/" component={LoginPage}/>
                        <Route
                            path="/logout"
                            component={() => {
                                this.props.logout();
                                window.location = `/`;
                                return <PageLoader active/>;
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
