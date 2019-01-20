import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import HttpSelect from "../molecules/HttpSelect";

class MovimientosForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.data,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.type !== this.props.type)
            this.setState({
                n_activos: null,
                cod_personal_involucrado: null,
                tiempo_limite: null,
                motivo: null,
                ubicacion: null,
            });
        else
            this.setState({ ...nextProps.data });
    }

    handleChange = field => evt => {
        this.setState({ [field]: evt.target.value }, () => this.props.onChange(this.state));
    };

    render = () => {
        const { type, getPersonal, ubicaciones, disabled = false } = this.props;
        return <Grid container style={{ padding: "0 5%" }}>
            <Grid item xs={12}>
                <TextField
                    id="standard-number3"
                    fullWidth
                    label="# de Activo"
                    value={this.state.n_activos}
                    type="text"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={12}>
                <HttpSelect
                    label="Personal responsable"
                    fetch={getPersonal}
                    itemKey="codper"
                    itemLabel={d => `${d.cedper} - ${d.nomper} ${d.apeper}`}
                    minLength={4}
                    value={this.state.cod_personal_involucrado}
                    onChange={this.handleChange("cod_personal_involucrado")}
                />
            </Grid>
            {(type === 'prestamo' || type === 'salida') && <Grid item xs={12}>
                <TextField
                    id="datetime-local"
                    label="Tiempo límite"
                    fullWidth
                    type="datetime-local"
                    value={this.state.tiempo_limite}
                    onChange={this.handleChange("tiempo_limite")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            }

            {(type === 'desincorporacion' || type === 'reparacion') && <Grid item xs={12}>
                <TextField
                    id="standard-textarea"
                    label="Motivo"
                    fullWidth
                    value={this.state.motivo}
                    onChange={this.handleChange("motivo")}
                    multiline
                    disabled={disabled}
                    margin="normal"
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
                >
                    {ubicaciones.map(({ codubifis, desubifis }) => (
                        <MenuItem key={codubifis} value={codubifis}>
                            {desubifis}
                        </MenuItem>
                    ))}
                </TextField> 
            </Grid>}
        </Grid>;

    };
}

export default MovimientosForm;
