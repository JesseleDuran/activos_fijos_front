import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class ActivosForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.activo,
        };
    }

    handleChange = field => evt => {
        this.setState({ [field]: evt.target.value }, () => this.props.onChange(this.state));
    };

    handleCheckChange = field => evt => {
        this.setState({ [field]: evt.target.checked }, () => this.props.onChange(this.state));
    };

    render = () => {

        const { clasificaciones, marcas, ubicaciones, disabled = false } = this.props;
        return <Grid container spacing={24}>
            <Grid item xs={3}>
                <TextField
                    id="standard-number"
                    label="# Orden de compra"
                    value={this.state.numero_orden_compra}
                    onChange={this.handleChange("numero_orden_compra")}
                    type="number"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="standard-number3"
                    label="# de Activo"
                    value={this.state.n_activo}
                    onChange={this.handleChange("n_activo")}
                    type="number"
                    disabled={disabled}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="standard-number2"
                    label="Meses de vida útil"
                    value={this.state.vida_util_meses}
                    onChange={this.handleChange("vida_util_meses")}
                    type="number"
                    disabled={disabled}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="standard-number4"
                    label="Modelo"
                    value={this.state.modelo}
                    onChange={this.handleChange("modelo")}
                    type="text"
                    disabled={disabled}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="standard-number5"
                    label="Serial"
                    value={this.state.serial}
                    onChange={this.handleChange("serial")}
                    type="text"
                    disabled={disabled}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="standard-textarea"
                    label="Descripción"
                    value={this.state.descripcion}
                    onChange={this.handleChange("descripcion")}
                    multiline
                    disabled={disabled}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                id="standard-select-ubic"
                select
                label="Ubicacion Geografica"
                value={this.state.cod_ubicacion_geografica || this.state.desubifis}
                onChange={this.handleChange("cod_ubicacion_geografica")}
                helperText="Seleccione Ubicacion"
                disabled={disabled}
                margin="normal"
            >
                {ubicaciones.map(({ codubifis, desubifis }) => (
                    <MenuItem key={codubifis} value={codubifis}>
                        {desubifis}
                    </MenuItem>
                ))}
            </TextField>
            </Grid>
            
            <Grid item xs={3}>
                <TextField
                    id="standard-select-brand"
                    select
                    label="Marca"
                    value={this.state.marca}
                    onChange={this.handleChange("marca")}
                    helperText="Seleccione una marca"
                    disabled={disabled}
                    margin="normal"
                >
                    {marcas.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="standard-select-cla"
                    select
                    disabled={disabled}
                    label="Clasificación"
                    value={this.state.clasificacion}
                    onChange={this.handleChange("clasificacion")}
                    helperText="Seleccione clasificación"
                    margin="normal"
                >
                    {clasificaciones.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <FormControlLabel
                disabled={disabled}
                control={
                    <Checkbox
                        checked={this.state.is_depreciable}
                        onChange={this.handleCheckChange("is_depreciable")}
                        value={"HEY"}
                    />
                }
                label={"¿Es despreciable?"}
            />

        </Grid>;

    };
}

export default ActivosForm;
