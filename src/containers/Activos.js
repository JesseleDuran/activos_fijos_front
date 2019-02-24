import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ActivosPage from "../components/pages/ActivosPage";

import Page from "../hocs/Page";
import { deleteActivo, getActivos as getActivosRequest } from "../api/activos";
import confirm from "../utils/confirm";
import { showError } from "../actions/UI";

const REQUEST_TIMEOUT = 1000;

@Page({ title: "Inventario" })
class ActivosContainer extends Component {
    fetchTimeout = null;

    state = {
        page: 0,
        size: 10,
        activos: [],
        query: null,
        sorted: null,
        loading: false,
        activo: null,
        movement: null,
        toUpdate: []
    };

    componentDidMount() {
        this.getActivos();
    }

    show = activo => {
        this.setState({ activo });
    };

    close = () => {
        this.setState({ activo: null });
    };

    showMovementModal = (activo) => {
        this.setState({ movement: activo });
    };

    closeMovement = () => {
        this.setState({ movement: null });
    };


    remove = item => {
        confirm("Estas Seguro?").then(
            () => {
                deleteActivo(item.n_activo)
                    .then(this.getActivos)
                    .catch(() => {
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
        this.setState({ size: pageSize, page, sorted, filtered }, this.fetch);
    };

    onChangeUpdate = (key, value) => {
        let toUpdateHelper = this.state.toUpdate;
        let contains = this.containsObject(key, toUpdateHelper);
        contains !== false ? toUpdateHelper[contains].value = value : toUpdateHelper.push({'id': key, 'value': value });
        this.setState({ toUpdate: toUpdateHelper });
    };

    containsObject(key, list) {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === key) {
                return i
            }
        }
        return false;
    }

    render = () => {
        const { activos, page, size, query, sorted, loading, activo } = this.state;
        return (
            <ActivosPage
                activos={activos}
                page={page}
                size={size}
                query={query}
                sorted={sorted}
                onChange={this.onChange}
                onChangeUpdate={this.onChangeUpdate}
                loading={loading}
                show={this.show}
                remove={this.remove}
                activo={activo}
                close={this.close}
                showMovementModal={this.showMovementModal}
                closeMovement={this.closeMovement}
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
