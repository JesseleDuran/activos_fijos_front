import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import CrearActivosPage from "../components/pages/CrearActivosPage";
import { createActivo, getBrands, getClasification, getOrdenes, getUbications } from "../api/activos";
import { getCodemp } from "../reducers/auth";

const ActivoKeys = {
    "n_activo": 234029,
    "modelo": "s8",
    "is_depreciable": true,
    "serial": "4fh5830",
    "descripcion": "un telefono",
    "id_soc_ordencompra": 1,
    "vida_util_meses": 10,
    "clasificacion": "electronico",
    "marca": "samsung",
    "cod_ubicacion_geografica": "uverito",
};

@Page({ title: "Crear Activo" })
class CrearActivosContainer extends Component {

    state = {
        step: 0,
        marcas: [],
        clasificaciones: [],
        ubicaciones: [],
        ordenes: [],
        completed: {},
        activo: {
            id_soc_ordencompra: null,
            is_depreciable: false,
        },
    };

    async componentWillMount() {
        const ordenes = await getOrdenes();
        const clasificaciones = await getClasification();
        const marcas = await getBrands();
        const ubicaciones = await getUbications();
        this.setState({ ordenes, clasificaciones, marcas, ubicaciones });
    }

    onSelectOrden = orden => {
        this.setState(state => ({
            activo: {
                ...state.activo,
                id_soc_ordencompra: orden,
            },
            completed: {
                ...state.completed,
                [0]: orden,
            },
        }));
    };

    handleBack = () => {
        this.setState(state => ({ step: state.step - 1 }));
    };

    handleNext = () => {
        this.setState(state => ({ step: state.step + 1 }));
    };

    isValidActivo = activo => {
        console.log("ACTIVO!", activo);
        return Object.keys(ActivoKeys)
            .map(key => activo[key] !== undefined)
            .reduce((prev, next) => prev && next, true);
    };

    onActivoChange = activo => {
        this.setState(state => ({
            completed: {
                ...state.completed,
                [1]: this.isValidActivo(activo),
            },
            activo,
        }));
    };

    isCompleted = (index) => {
        return this.state.completed[index];
    };

    create = () => {
        createActivo({
            ...this.state.activo,
            cod_empresa: this.props.cod_empresa,
        }).then(activo => {
            this.props.history.push("/activos");
        });
    };

    render = () => {
        const { step, clasificaciones, marcas, ordenes, activo, ubicaciones } = this.state;
        return (
            <CrearActivosPage
                step={step}
                clasificaciones={clasificaciones}
                marcas={marcas}
                ubicaciones={ubicaciones}
                ordenes={ordenes}
                onSelectOrden={this.onSelectOrden}
                activo={activo}
                onActivoChange={this.onActivoChange}
                handleBack={this.handleBack}
                handleNext={this.handleNext}
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
)(withRouter(CrearActivosContainer));
