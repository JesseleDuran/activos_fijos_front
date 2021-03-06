import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import HttpSelect from "../molecules/HttpSelect";
import { ubicacionesToOptions, ubicacionesAdministrativasToOptions } from "../../utils/functions"
import CreateNewItemsDropdown from "../molecules/CreateNewItemsDropdown"

class MovimientosForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.data,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.props.type)
            this.setState({
                n_activos: null,
                cod_personal_involucrado: null,
                tiempo_limite: null,
                motivo: null,
                ubicacion_geografica: null,
                ubicacion_administrativa: null,
                ubicacion: null,
                departamento: null
            });
        else
            this.setState({ ...nextProps.data });
    }

    handleChange = field => evt => {
        this.setState({ [field]: evt.target.value }, () => this.props.onChange(this.state));
    };

    handleDropdownChange = field => evt => {
        if(evt !== null) {
            this.setState({ [field]: evt.value }, () => this.props.onChange(this.state));
        } else {
            this.setState({ [field]: null }, () => this.props.onChange(this.state));
        }
    };

    render = () => {
        const { type, getPersonal, ubicacionesFisicas, ubicacionesAdministrativas, departamentos, disabled = false } = this.props;
        return <Grid container style={{ padding: "0 5%" }}>
            <Grid item xs={12}>
                <TextField
                    id="standard-number3"
                    fullWidth
                    label="N° de Activo"
                    value={this.state.n_activos}
                    type="text"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
            </Grid>   
            {(type === 'asignacion' || type === 'reasignacion' || type === 'prestamo') && <Grid item xs={12}>
                    <HttpSelect
                        label="Personal responsable"
                        fetch={getPersonal}
                        itemKey="codper"
                        itemLabel={d => `${d.cedper} - ${d.nomper} ${d.apeper}`}
                        minLength={4}
                        value={this.state.cod_personal_involucrado}
                        onChange={this.handleChange("cod_personal_involucrado")}
                    />
            </Grid>}

            {(type === 'asignacion' || type === 'reasignacion') && <Grid item xs={12} style={{ padding: "2% 0" }}>
                    <CreateNewItemsDropdown
                        label="Ubicación geográfica"
                        id="standard-select-ubicacion-grografica"
                        options={ubicacionesToOptions(ubicacionesFisicas)}
                        onChange={this.handleDropdownChange("ubicacion_geografica")}
                    />
            </Grid>}  
            {(type === 'asignacion' || type === 'reasignacion')  && <Grid item xs={12} style={{ padding: "2% 0" }}>
                <CreateNewItemsDropdown
                    id="standard-select-clasificacion"
                    label="Ubicación Administrativa"
                    options={ubicacionesAdministrativasToOptions(ubicacionesAdministrativas)}
                    onChange={this.handleDropdownChange("ubicacion_administrativa")}
                />
            </Grid>} 
            {(type === 'asignacion' || type === 'reasignacion')  && <Grid item xs={12} style={{ padding: "2% 0" }}>
                <CreateNewItemsDropdown
                    id="standard-select-clasificacion"
                    label="Ubicación Departamento"
                    options={ubicacionesToOptions(departamentos)}
                    onChange={this.handleDropdownChange("departamento")}
                />
            </Grid>} 
            {(type === 'reparacion' || type === 'salida' || type === 'desincorporacion') && <Grid item xs={12}>
                <TextField
                    id="standard-select-ubic"
                    type="text"
                    fullWidth
                    label="Destino"
                    value={this.state.ubicacion}
                    onChange={this.handleChange("ubicacion")}
                    helperText="Escriba la ubicación del destino"
                    disabled={disabled}
                    margin="normal"
                />
            </Grid>}

            {(type === 'prestamo' || type === 'salida') && <Grid item xs={12}>
                <TextField
                    id="datetime-local"
                    label="Tiempo límite"
                    fullWidth
                    type="date"
                    value={this.state.tiempo_limite}
                    onChange={this.handleChange("tiempo_limite")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            }

            {(type === 'desincorporacion' || type === 'reparacion' || type === 'prestamo' || type === 'salida') && <Grid item xs={12}>
                <TextField
                    id="standard-textarea"
                    label="Motivo u Observación"
                    fullWidth
                    value={this.state.motivo}
                    onChange={this.handleChange("motivo")}
                    multiline
                    disabled={disabled}
                    margin="normal"
                />
            </Grid>}
            
        </Grid>;

    };
}

export default MovimientosForm;
