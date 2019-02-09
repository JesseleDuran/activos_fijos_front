import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import CrearActivosPage from "../components/pages/CrearActivosPage";
import { createActivo, getBrands, getClasification, getOrdenes, getUbications } from "../api/activos";
import { getCodemp } from "../reducers/auth";

const ActivoKeys = {
	"cedula_beneficiario": "----------",
    "centro_costo": "0000002402",
    "clasificacion": "oficina",
    "codigo_articulo": "00000000000000000134",
    "codigo_proveedor": "0000000175",
    "codigo_tipo_factura": "00004",
    "condicion_pago": "CONTADO",
    "costo_unitario": 56.66,
    "cuenta_presupuestaria": "401070900",
    "descripcion_activo": "LAPIZ GRAFITO",
    "descripcion_compra": "MADERAS DEL ORINOCO. ",
    "fecha_compra": "2018-08-16T04:00:00.000Z",
    "is_depreciable": true,
    "marca": "mongo",
    "modelo": "t-hdsf",
    "n_activo": "345",
    "nombre_proveedor": "PAPELERIA LATINA ORIENTE, C.A",
    "numero_factura": "ANTICIPO143",
    "numero_orden_compra": "000000000000143",
    "orden_compra": "000000000000143",
    "serial": "345-6",
    "unidad_administrativa": "DEPARTAMENTO DE ADMINISTRACIÓN DEL PERSONAL",
    "unidades": 510,
    "vida_util_meses": "10"
} 

@Page({ title: "Crear Activo" })
class CrearActivosContainer extends Component {

    state = {
        step: 0,
        marcas: [],
        clasificaciones: [],
        ordenes: [],
        completed: {},
        activo: {
            codigo_articulo: null,
            numero_orden_compra: null,
            numero_factura: null,
            codigo_tipo_factura: null,
            codigo_proveedor: null,
            cedula_beneficiario: null
        },
    };

    async componentWillMount() {
        const ordenes = await getOrdenes();
        const clasificaciones = await getClasification();
        const marcas = await getBrands();
        this.setState({ ordenes, clasificaciones, marcas });
    }

    onSelectOrden = activo => {
        this.setState(state => ({
            activo: {
                ...state.activo,
                numero_orden_compra: activo === null ? null : activo.orden_compra,
                ...activo
            },
            completed: {
                ...state.completed,
                [0]: activo === null ? null : activo.orden_compra,
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
        }).then(() => {
            this.props.history.push("/activos");
        }).catch(() => this.props.showError("Error al Crear Activo"));
    };

    render = () => {
        const { step, clasificaciones, marcas, ordenes, activo } = this.state;
        return (
            <CrearActivosPage
                step={step}
                clasificaciones={clasificaciones}
                marcas={marcas}
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
