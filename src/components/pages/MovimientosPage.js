import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { translateKey } from "utils/translate";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Paper from "@material-ui/core/Paper/Paper";
import ActivosSelector from "../organisms/ActivosSelector";
import MovimientosForm from "../organisms/MovimientosForm";
import Button from "@material-ui/core/Button/Button";
import ControlledSelect from "../molecules/Select"

const styles = theme => ({});

const TYPES = ["Asignacion", "Desincorporacion", "Reasignacion", "Prestamo", "Reparacion", "Salida"];

export const movementTypesToOptions = (movementTypes) => {
    return movementTypes.map(type => ({ label: type, value: type }));
}

class MovimientosPage extends React.Component {

    render() {
        const {
            movementType,
            changeType,
            onSelectActivo,
            onUnSelectActivo,
            data,
            onChangeData,
            activos,
            selected,
            getPersonal,
            ubicacionesFisicas,
            ubicacionesAdministrativas,
            isCompleted,
            create,
        } = this.props;
        return <Paper>
            <Grid container>
                <Grid item xs={12} style={{ padding: "1%" }}>
                    <ControlledSelect
                        id="standard-select-movement"
                        label="Tipo de Movimiento"
                        options={movementTypesToOptions(TYPES)}
                        onChange={changeType}
                        value={'Asignacion'}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ActivosSelector
                        activos={activos}
                        onSelect={onSelectActivo}
                        onUnSelect={onUnSelectActivo}
                        selected={selected}
                        multilple={!movementType}/> {/* if the movementType is 0 multiple is True */}
                </Grid>
                <Grid item xs={6}>
                    <MovimientosForm
                        type={movementType}
                        data={data}
                        onChange={onChangeData}
                        getPersonal={getPersonal}
                        ubicacionesFisicas={ubicacionesFisicas}
                        ubicacionesAdministrativas={ubicacionesAdministrativas}
                        />
                </Grid>
            </Grid>
            <Grid container item xs={12} justify="flex-end" style={{ padding: "1%" }}>
                <Button disabled={!isCompleted()} onClick={create} variant="contained" color="primary">
                    Crear movimiento
                </Button>
            </Grid>
        </Paper>;
    }
}


export default withStyles(styles)(MovimientosPage);
