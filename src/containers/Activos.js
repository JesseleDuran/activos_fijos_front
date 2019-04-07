import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ActivosPage from "../components/pages/ActivosPage";

import Page from "../hocs/Page";
import { deleteActivo, getActivos as getActivosRequest, updateActivo, getClasification, getBrands, getMovimiento } from "../api/activos";
import confirm from "../utils/confirm";
import { showError } from "../actions/UI";
import { render } from "../pdf-templates/PDFGenerator";
import Asignation from "../pdf-templates/Asignation";

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

    async componentWillMount() {
        const clasificaciones = await getClasification();
        const marcas = await getBrands();
        this.setState({ clasificaciones, marcas });
    }

    componentDidMount() {
        this.getActivos();
    }

    show = activo => {
        this.setState({ activo });
    };

    close = () => {
        this.setState({ activo: null , toUpdate: []});
    };

    showMovementModal = (activo) => {
        this.setState({ movement: activo });
    };

    closeMovement = () => {
        this.setState({ movement: null });
    };


    remove = item => {
        confirm(`¿Estás seguro de querer borrar el activo N° ${item.n_activo}?`).then(
            () => {
                deleteActivo(item.n_activo)
                    .then(this.getActivos)
                    .catch(() => {
                        this.props.showError(
                            "Error al borrar activo, intente de nuevo",
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
        const toUpdateHelper = this.state.toUpdate;
        const contains = this.containsObject(key, toUpdateHelper);
        contains !== false ? toUpdateHelper[contains].value = value : toUpdateHelper.push({'id': key, 'value': value });
        this.setState({ toUpdate: toUpdateHelper });
    };

    update = () => {
        const {activo, toUpdate}  = this.state
        updateActivo(activo.n_activo, toUpdate)
            .then(activo => {
                this.setState({ activo, loading: false});
                this.close()
                this.getActivos();
            })
            .catch(() => {
                this.props.showError("Error al actualizar activo");
                this.setState({ loading: false });
            });
    }

    downloadCartaDeAsignacion = () => {
        const {activo}  = this.state
        const listMovimientos = activo.movimientos.filter(movimiento => (movimiento.tipo === 'asignacion' || movimiento.tipo === 'reasignacion') && movimiento.nombre_personal !== null)
        if(listMovimientos.length > 0) {
            const promises = getMovimiento(listMovimientos[0].id);
            promises.then(movementsInfo => {
                if(movementsInfo.apellido_personal !== null) {
                    render(<Asignation movements={[movementsInfo]}/>);
                }
            })
            .catch(() => {
                this.props.showError("Error al generar informe de Asignación");
            });
        }
    };

    containsObject = (key, list) => {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === key) {
                return i
            }
        }
        return false;
    }

    render = () => {
        const { activos, page, size, query, sorted, loading, activo, clasificaciones, marcas } = this.state;
        return (
            <ActivosPage
                activos={activos}
                clasificaciones={clasificaciones}
                marcas={marcas}
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
                update={this.update}
                hasChanged={(this.state.toUpdate.length === 0)}
                downloadCartaDeAsignacion={this.downloadCartaDeAsignacion}
            />
        );
    };
}

const mapStateToProps = () => ({});

export default connect(
    mapStateToProps,
    {
        showError,
    },
)(withRouter(ActivosContainer));
