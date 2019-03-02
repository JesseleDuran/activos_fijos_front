import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import { getBrands, getClasification, getReporte, getUbications, getUbicationsAdmin } from "../api/activos";
import { getCodemp } from "../utils/state";
import ReportesPage from "../components/pages/ReportesPage";

@Page({ title: "Reportes de Depreciación" })
class ReportesContainer extends Component {

    state = {
        clasificaciones: [],
        marcas: [],
        ubicaciones: [],
        ubicacionesAdministrativas: [],
        selectedMarcas: [],
        selectedUbicaciones: [],
        selectedClasificaciones: [],
        selectedUbicacionesAdministrativas: [],
        fecha: null,
        loading: false,
        data: [],
    };

    async componentWillMount() {
        const clasificaciones = await getClasification();
        const marcas = await getBrands();
        const ubicaciones = await getUbications();
        const ubicacionesAdministrativas = await getUbicationsAdmin();
        this.setState({ clasificaciones, marcas, ubicaciones, ubicacionesAdministrativas });
    }

    handleChange = property => value => {
        this.setState({ [property]: value });
    };

    handleChangeFecha = value => {
        this.setState({ fecha: value });
    };

    generateFiltered = () => {
        const { selectedMarcas, selectedUbicaciones, selectedClasificaciones, selectedUbicacionesAdministrativas } = this.state;
        const ubicationAdmin = selectedUbicacionesAdministrativas.map(value => ({ id: "ubicacion_administrativa", value }));
        const ubicationFilter = selectedUbicaciones.map(value => ({ id: "ubicacion_geografica", value }));
        const marcasFilter = selectedMarcas.map(value => ({ id: "marca", value }));
        const clasificacionFilter = selectedClasificaciones.map(value => ({ id: "clasificacion", value }));
        return [
            ...ubicationAdmin,
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
            ubicaciones, ubicacionesAdministrativas,
            selectedMarcas, selectedUbicaciones, selectedUbicacionesAdministrativas,
            selectedClasificaciones, loading,
            fecha
        } = this.state;
        return (
            <ReportesPage
                preview={data}
                loading={loading}
                ubicaciones={ubicaciones}
                ubicacionesAdministrativas={ubicacionesAdministrativas}
                marcas={marcas}
                fecha={fecha}
                clasificaciones={clasificaciones}
                selectedMarcas={selectedMarcas}
                selectedUbicaciones={selectedUbicaciones}
                selectedUbicacionesAdministrativas={selectedUbicacionesAdministrativas}
                selectedClasificaciones={selectedClasificaciones}
                changeFecha={this.handleChangeFecha}
                changeMarcas={this.handleChange("selectedMarcas")}
                changeUbicaciones={this.handleChange("selectedUbicaciones")}
                changeClasificaciones={this.handleChange("selectedClasificaciones")}
                changeUbicacionesAdministrativas={this.handleChange("selectedUbicacionesAdministrativas")}
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
)(withRouter(ReportesContainer));
