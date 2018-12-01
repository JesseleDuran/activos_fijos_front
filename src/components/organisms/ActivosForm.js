import React from "react";
import SearchInput from "../molecules/SearchInput";
import Grid from "@material-ui/core/Grid/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";
import { AutoSizer, List } from "react-virtualized";
import ChoppedText from "../atoms/ChoppedText";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const ListContainer = styled.div`
  width:100%;
  height: ${props => props.height};
  max-height: ${props => props.height};
  overflow-y: auto;
`;


class ActivosForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("PROPS", props);
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

        const { clasificaciones, marcas, ubicaciones } = this.props;
        return <Grid container>
            <TextField
                id="standard-number"
                label="# Orden de Compra"
                value={this.state.id_soc_ordencompra}
                onChange={this.handleChange("age")}
                type="number"
                disabled
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />

            <TextField
                id="standard-number3"
                label="# de Activo"
                value={this.state.n_activo}
                onChange={this.handleChange("n_activo")}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />


            <TextField
                id="standard-number2"
                label="Meses de vida Util"
                value={this.state.vida_util_meses}
                onChange={this.handleChange("vida_util_meses")}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />


            <TextField
                id="standard-number4"
                label="Modelo"
                value={this.state.modelo}
                onChange={this.handleChange("modelo")}
                type="text"
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="standard-number5"
                label="Serial"
                value={this.state.serial}
                onChange={this.handleChange("serial")}
                type="text"
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />

            <TextField
                id="standard-textarea"
                label="Descripcion"
                value={this.state.descripcion}
                onChange={this.handleChange("descripcion")}
                multiline
                margin="normal"
            />

            <TextField
                id="standard-select-ubic"
                select
                label="Ubicacion Geografica"
                value={this.state.cod_ubicacion_geografica}
                onChange={this.handleChange("cod_ubicacion_geografica")}
                helperText="Seleccione Ubicacion"
                margin="normal"
            >
                {ubicaciones.map(({ codubifis, desubifis }) => (
                    <MenuItem key={codubifis} value={codubifis}>
                        {desubifis}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                id="standard-select-brand"
                select
                label="Marca"
                value={this.state.marca}
                onChange={this.handleChange("marca")}
                helperText="Seleccione Ubicacion"
                margin="normal"
            >
                {marcas.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                id="standard-select-cla"
                select
                label="Clasificacion"
                value={this.state.clasificacion}
                onChange={this.handleChange("clasificacion")}
                helperText="Seleccione Ubicacion"
                margin="normal"
            >
                {clasificaciones.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>

            <FormControlLabel
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
