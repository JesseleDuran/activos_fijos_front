import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import { getBrands, getClasification, getReporte, getUbications, getUbicationsAdmin, getDepartamentos } from "../api/activos";
import { getCodemp } from "../utils/state";
import ReportesPage from "../components/pages/ReportesPage";

@Page({ title: "Reportes de Depreciación" })
class ReportesContainer extends Component {

    state = {
        clasificaciones: [],
        marcas: [],
        ubicaciones: [],
        ubicacionesAdministrativas: [],
        ubicacionesDptos: [],
        selectedMarcas: [],
        selectedUbicaciones: [],
        selectedClasificaciones: [],
        selectedUbicacionesAdministrativas: [],
        selectedDptos: [],
        fecha: null,
        loading: false,
        data: [],
    };

    async componentWillMount() {
        const clasificaciones = await getClasification();
        const marcas = await getBrands();
        const ubicaciones = await getUbications();
        const ubicacionesAdministrativas = await getUbicationsAdmin();
        const ubicacionesDptos = await getDepartamentos();
        this.setState({ clasificaciones, marcas, ubicaciones, ubicacionesAdministrativas, ubicacionesDptos });
    }

    handleChange = property => value => {
        this.setState({ [property]: value });
    };

    handleChangeFecha = value => {
        this.setState({ fecha: value });
    };

    generateFiltered = () => {
        const { selectedMarcas, selectedUbicaciones, selectedClasificaciones, selectedUbicacionesAdministrativas, selectedDptos } = this.state;
        const ubicationAdmin = selectedUbicacionesAdministrativas.map(value => ({ id: "ubicacion_administrativa", value }));
        const ubicationFilter = selectedUbicaciones.map(value => ({ id: "ubicacion_geografica", value }));
        const marcasFilter = selectedMarcas.map(value => ({ id: "marca", value }));
        const clasificacionFilter = selectedClasificaciones.map(value => ({ id: "clasificacion", value }));
        const ubicationDptos = selectedDptos.map(value => ({ id: "departamento", value }));
        return [
            ...ubicationAdmin,
            ...ubicationFilter,
            ...marcasFilter,
            ...clasificacionFilter,
            ...ubicationDptos
        ];
    };


    apply = () => {
        const { fecha } = this.state;
        const filtered = this.generateFiltered();
        this.setState({ loading: true }, () => {
            getReporte(filtered, fecha).then(data => {
                this.setState({ data, loading: false });
            })
            .catch(() => {
                this.props.showError("Error al generar reporte");
                this.setState({ loading: false });
            });
        });

    };

    render = () => {
        const {
            data,
            clasificaciones, marcas,
            ubicaciones, ubicacionesAdministrativas, ubicacionesDptos,
            selectedMarcas, selectedUbicaciones, selectedUbicacionesAdministrativas,
            selectedClasificaciones, selectedDptos, loading,
            fecha
        } = this.state;
        return (
            <ReportesPage
                preview={data}
                loading={loading}
                ubicaciones={ubicaciones}
                ubicacionesAdministrativas={ubicacionesAdministrativas}
                marcas={marcas}
                ubicacionesDptos={ubicacionesDptos}
                fecha={fecha}
                clasificaciones={clasificaciones}
                selectedMarcas={selectedMarcas}
                selectedUbicaciones={selectedUbicaciones}
                selectedUbicacionesAdministrativas={selectedUbicacionesAdministrativas}
                selectedClasificaciones={selectedClasificaciones}
                selectedDptos={selectedDptos}
                changeFecha={this.handleChangeFecha}
                changeMarcas={this.handleChange("selectedMarcas")}
                changeUbicaciones={this.handleChange("selectedUbicaciones")}
                changeClasificaciones={this.handleChange("selectedClasificaciones")}
                changeDptos={this.handleChange("selectedDptos")}
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
