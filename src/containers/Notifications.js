import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import NotificationsPage from "../components/pages/NotificationsPage";
import { getNotifications } from "../api/notifications";
import { getCodemp } from "../utils/state";

const initialState = {
    notifications: []
};

@Page({ title: "Notificaciones" })
class NotificationsContainer extends Component {

    state = {
        ...initialState,
    };

    async componentWillMount() {
        const notifications = await getNotifications();
        this.setState({ notifications });
    }

    render = () => {
        const { notifications } = this.state;
        return (
            <NotificationsPage
                notifications={notifications}
            />
        );
    };
}

const mapStateToProps = state => ({
    cod_empresa: getCodemp(state),
});

export default connect(
    mapStateToProps,
    {
        showError,
    },
)(withRouter(NotificationsContainer));
