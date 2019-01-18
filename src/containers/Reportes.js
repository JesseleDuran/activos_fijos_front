import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import { getBrands, getClasification, getReporte, getUbications } from "../api/activos";
import { getCodemp } from "../utils/state";
import ReportesPage from "../components/pages/ReportesPage";
import moment from "moment";

@Page({ title: "Generarador de Reportes" })
class MovimientosContainer extends Component {

    state = {
        clasificaciones: [],
        marcas: [],
        ubicaciones: [],
        selectedMarcas: [],
        selectedUbicaciones: [],
        selectedClasificaciones: [],
        fecha: null,
        loading: false,
        data: [],
    };

    async componentWillMount() {
        const clasificaciones = await getClasification();
        const marcas = await getBrands();
        const ubicaciones = await getUbications();
        this.setState({ clasificaciones, marcas, ubicaciones });
    }

    handleChange = property => value => {
        this.setState({ [property]: value });
    };


    handleChangeFecha = value => {
        this.setState({ fecha: value });
    };

    generateFiltered = () => {
        const { selectedMarcas, selectedUbicaciones, selectedClasificaciones } = this.state;
        const ubicationFilter = selectedUbicaciones.map(value => ({ id: "codubifis", value }));
        const marcasFilter = selectedMarcas.map(value => ({ id: "marca", value }));
        const clasificacionFilter = selectedClasificaciones.map(value => ({ id: "clasificacion", value }));
        return [
            ...ubicationFilter,
            ...marcasFilter,
            ...clasificacionFilter,
        ];
    };


    apply = () => {
        const { fecha } = this.state;
        const filtered = this.generateFiltered();
        this.setState({ loading: true }, () => {
            getReporte(filtered, fecha).then(data => {
                this.setState({ data, loading: false });
            });
        });

    };

    render = () => {
        const {
            data,
            clasificaciones, marcas,
            ubicaciones,
            selectedMarcas, selectedUbicaciones,
            selectedClasificaciones, loading,
            fecha,
        } = this.state;
        return (
            <ReportesPage
                preview={data}
                loading={loading}
                ubicaciones={ubicaciones}
                marcas={marcas}
                fecha={fecha}
                clasificaciones={clasificaciones}
                selectedMarcas={selectedMarcas}
                selectedUbicaciones={selectedUbicaciones}
                selectedClasificaciones={selectedClasificaciones}
                changeFecha={this.handleChangeFecha}
                changeMarcas={this.handleChange("selectedMarcas")}
                changeUbicaciones={this.handleChange("selectedUbicaciones")}
                changeClasificaciones={this.handleChange("selectedClasificaciones")}
                apply={this.apply}
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
