import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Page from "../hocs/Page";
import { showError } from "../actions/UI";
import { getBrands, getClasification, getUbications } from "../api/activos";
import { getCodemp } from "../utils/state";
import ReportesPage from "../components/pages/ReportesPage";
import moment from "moment";

@Page({ title: "Generarador de Reportes" })
class MovimientosContainer extends Component {

    state = {
        clasificaciones: [],
        marcas: [],
        ubicaciones: [],
        selectedMarcas: null,
        selectedUbicaciones: null,
        selectedClasificaciones: null,
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
        const max = moment().isSameOrBefore(moment(value));
        this.setState({ fecha: max ? value : null });
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
