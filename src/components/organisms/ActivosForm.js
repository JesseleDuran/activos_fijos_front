import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { marcasToOptions, clasificacionesToOptions } from "../../utils/functions"
import ControlledSelect from "../molecules/Select"
import { displayDateRightFormat } from "../../utils/dates"

class ActivosForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.activo,
            'is_depreciable' : true
        };
    }

    handleChange = field => evt => {
        this.setState({ [field]: evt.target.value }, () => this.props.onChange(this.state));
    };

    handleCheckChange = field => evt => {
        this.setState({ [field]: evt.target.checked }, () => this.props.onChange(this.state));
    };

    render = () => {

        const { clasificaciones, marcas, disabled = false } = this.props;
        return <Grid container spacing={24}>
            <Grid item xs={3}>
                <TextField
                    id="standard-orden"
                    label="N° Orden de compra"
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
                    id="standard-factura"
                    label="Factura"
                    value={this.state.numero_factura}
                    onChange={this.handleChange("numero_factura")}
                    type="text"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    id="standard-proveedor"
                    label="Proveedor"
                    value={this.state.nombre_proveedor}
                    onChange={this.handleChange("codigo_proveedor")}
                    type="text"
                    disabled
                    margin="normal"
                    style={{ width: "90%" }}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    id="standard-fecha-compra"
                    label="Fecha de Compra"
                    value={displayDateRightFormat(this.state.fecha_compra)}
                    onChange={this.handleChange("fecha_compra")}
                    type="text"
                    disabled
                    margin="normal"
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    id="standard-costo"
                    label="Costo"
                    value={this.state.costo_unitario}
                    onChange={this.handleChange("costo_unitario")}
                    type="text"
                    disabled
                    margin="normal"
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    id="standard-condicion-pago"
                    label="Condición de Pago"
                    value={this.state.condicion_pago}
                    onChange={this.handleChange("condicion_pago")}
                    type="text"
                    disabled
                    margin="normal"
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    id="standard-cuenta-presupuestaria"
                    label="Cuenta Presupuestaria"
                    value={this.state.cuenta_presupuestaria}
                    onChange={this.handleChange("cuenta_presupuestaria")}
                    type="text"
                    disabled
                    margin="normal"
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    id="standard-centro-costo"
                    label="Centro de Costo"
                    value={this.state.centro_costo.substr(6)}
                    onChange={this.handleChange("centro_costo")}
                    type="text"
                    disabled
                    margin="normal"
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    id="standard-number3"
                    label="N° de Activo"
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
                    value={this.state.descripcion_activo}
                    onChange={this.handleChange("descripcion_activo")}
                    multiline
                    disabled={disabled}
                    margin="normal"
                />
            </Grid>
            
            <Grid item xs={3}>
                <ControlledSelect
                    id="standard-select-brand"
                    label="Marca"
                    options={marcasToOptions(marcas)}
                    onChange={this.handleChange("marca")}
                    value=""
                />
            </Grid>
            <Grid item xs={3}>
                <ControlledSelect
                    id="standard-select-clasificacion"
                    label="Clasificación"
                    options={clasificacionesToOptions(clasificaciones)}
                    onChange={this.handleChange("clasificacion")}
                    value=""
                />
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
                label={"¿Es depreciable?"}
            />
            {this.state.is_depreciable ?
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
                </Grid> : ''
            }

        </Grid>;

    };
}

export default ActivosForm;
