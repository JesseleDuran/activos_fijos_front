import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import MovimientosPage from "../components/pages/MovimientosPage";
import { createMovimiento, getActivos, getMovimiento, getPersonal, getActivoByMovimiento } from "../api/activos";
import { getCodemp } from "../utils/state";
import Asignation from "../pdf-templates/Asignation";
import { render } from "../pdf-templates/PDFGenerator";

const fieldsFilledsByType = [2, 4, 3, 4, 4, 4];
const TYPES = ["Asignacion", "Desincorporacion", "Reasignacion", "Prestacion", "Reparacion", "Salida"];
const initialState = {
    movementType: null,
    activos: [],
    selected: [], // Activos!
    ubicaciones: [],
    data: {},
};

@Page({ title: "Movimientos" })
class MovimientosContainer extends Component {


    state = {
        ...initialState,
    };

    componentWillMount() {
    }

    changeType = (evt) => {
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
        } else if (type === 5) {
        }
    };

    create = () => {
        const { data, movementType } = this.state;
        const movimiento = {
            ...data,
            tipo: TYPES[movementType].toLowerCase(),
            n_activos: data.n_activos.split(","),
            cod_empresa: this.props.cod_empresa,
        };

        createMovimiento(movimiento).then(res => {
            this.toPdfIfNeeded(movementType, res);
            this.setState({ ...initialState });
        });
    };

    render = () => {
        const { movementType, data, activos, selected, ubicaciones } = this.state;
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
                ubicaciones={ubicaciones}
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
