import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ActivosPage from "../components/pages/ActivosPage";

import Page from "../hocs/Page";
import { deleteActivo, getActivos as getActivosRequest } from "../api/activos";
import confirm from "../utils/confirm";
import { showError } from "../actions/UI";

const REQUEST_TIMEOUT = 1000;

@Page({ title: "Activos" })
class ActivosContainer extends Component {
    fetchTimeout = null;

    state = {
        page: 0,
        size: 10,
        activos: [],
        query: {},
        sorted: {},
        loading: false,
    };

    componentWillMount() {
        this.getActivos();
    }

    show = item => {
        console.log("SHOW", item);
    };

    remove = item => {
        confirm("Estas Seguro?").then(
            () => {
                deleteActivo(item.n_activo)
                    .then(this.getActivos)
                    .catch(() => {
                        console.log("ERR");
                        this.props.showError(
                            "Error al Borrar, Intente de nuevo",
                        );
                    });
            },
            () => {
            },
        );
    };

    fetch = () => {
        if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
        this.fetchTimeout = setTimeout(() => {
            this.setState({ loading: true });
            this.getActivos();
        }, REQUEST_TIMEOUT);
    };

    getActivos = () => {
        getActivosRequest(this.state)
            .then(activos => {
                this.setState({ activos, loading: false });
                clearTimeout(this.fetchTimeout);
            })
            .catch(() => {
                this.props.showError("Error al conseguir Activos");
                this.setState({ loading: false });
            });
    };

    onChange = ({ pageSize, page, sorted, filtered }) => {
        console.log("HEY", pageSize, page, sorted, filtered);
        this.setState({ size: pageSize, page, sorted, filtered }, this.fetch);
    };

    render = () => {
        const { activos, page, size, query, sorted, loading } = this.state;
        return (
            <ActivosPage
                activos={activos}
                page={page}
                size={size}
                query={query}
                sorted={sorted}
                onChange={this.onChange}
                loading={loading}
                show={this.show}
                remove={this.remove}
            />
        );
    };
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    {
        showError,
    },
)(withRouter(ActivosContainer));
