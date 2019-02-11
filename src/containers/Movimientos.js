import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import MovimientosPage from "../components/pages/MovimientosPage";
import { createMovimiento, getMovimiento, getPersonal, getActivoByMovimiento, getUbications, getUbicationsAdmin } from "../api/activos";
import { getCodemp } from "../utils/state";
import Asignation from "../pdf-templates/Asignation";
import { render } from "../pdf-templates/PDFGenerator";

const fieldsFilledsByType = {
    'asignacion': 2, 
    'desincorporacion': 3, 
    'reasignacion': 2, 
    'prestamo': 3, 
    'reparacion': 3, 
    'salida': 4
};
const initialState = {
    movementType: 'asignacion',
    activos: [],
    selected: [], // Activos!
    data: {},
};

@Page({ title: "Movimientos" })
class MovimientosContainer extends Component {

    state = {
        ...initialState,
        ubicacionesFisicas: [],
        ubicacionesAdministrativas: [],
    };

    async componentWillMount() {
        const ubicacionesFisicas = await getUbications();
        const ubicacionesAdministrativas = await getUbicationsAdmin();
        this.setState({ ...initialState, ubicacionesFisicas, ubicacionesAdministrativas }, this.getActivos);
    }

    changeType = (evt) => {
        console.log('oli')
        this.setState({ ...initialState, movementType: evt.target.value.toLowerCase() }, this.getActivos);
    };

    getActivos = () => {
        const { movementType } = this.state;
        getActivoByMovimiento(movementType).then(activos => this.setState({ activos }));
    };

    onSelectActivo = activo => {
        const { movementType } = this.state;
        this.setState(state => {
            const selected = movementType ? [activo] : [...state.selected, activo];
            return {
                selected,
                data: {
                    ...state.data,
                    n_activos: selected.map(({ n_activo }) => n_activo).join(","),
                },
            };
        });
    };

    onUnSelectActivo = activo => {
        this.setState(state => {
            const selected = state.selected.filter(({ n_activo }) => activo.n_activo !== n_activo);
            return {
                selected,
                data: {
                    ...state.data,
                    n_activos: selected.map(({ n_activo }) => n_activo).join(","),
                },
            };
        });
    };

    onChangeData = data => {
        this.setState({ data });
    };

    isCompleted = () => {
        const notNullValues = Object.keys(this.state.data).filter(key => this.state.data[key]).length;
        if (this.state.movementType === 'asignacion') {
            return notNullValues >= fieldsFilledsByType[this.state.movementType];
        }
        return notNullValues === fieldsFilledsByType[this.state.movementType];
    };

    renderAsignacion = movements => {

        const promises = movements.map(({ id }) => getMovimiento(id));
        Promise.all(promises).then(movementsInfo => {
            render(<Asignation movements={movementsInfo}/>);
        });
    };

    toPdfIfNeeded = (type, movements) => {
        if (type === 0) {
            this.renderAsignacion(movements);
        }
    };

    create = () => {
        const { data, movementType } = this.state;
        const movimiento = {
            ...data,
            tipo: movementType,
            n_activos: data.n_activos.split(","),
            cod_empresa: this.props.cod_empresa,
        };

        createMovimiento(movimiento).then(res => {
            this.toPdfIfNeeded(movementType, res);
            this.setState({ ...initialState });
        });
    };

    render = () => {
        const { movementType, data, activos, selected, ubicacionesFisicas, ubicacionesAdministrativas } = this.state;
        return (
            <MovimientosPage
                activos={activos}
                movementType={movementType}
                changeType={this.changeType}
                onSelectActivo={this.onSelectActivo}
                onUnSelectActivo={this.onUnSelectActivo}
                onChangeData={this.onChangeData}
                selected={selected}
                data={data}
                getPersonal={getPersonal}
                ubicacionesFisicas={ubicacionesFisicas}
                ubicacionesAdministrativas={ubicacionesAdministrativas}
                isCompleted={this.isCompleted}
                create={this.create}
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
)(withRouter(MovimientosContainer));
