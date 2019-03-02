import Grid from "@material-ui/core/Grid";
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { displayDateRightFormatWithTime, displayDateRightFormat } from "../../utils/dates"

const styles = () => ({
    root: {
        width: '100%',
    },
});

function returnTextByMovement(movement) {
    switch (movement.tipo) {
        case 'asignacion':
            return `El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) ASIGNÓ este activo 
                a ${movement.nombre_personal} ${movement.apellido_personal} V-${movement.cedula_personal}
                en la Ubic. Geográfica: ${movement.ubicacion_geografica}, 
                Ubic. Administrativa: ${movement.ubicacion_administrativa}, 
                Ubic. Departamento: ${movement.departamento}.`
        case 'reasignacion':
            return `El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) REASIGNÓ este activo 
                ${movement.nombre_personal !== null ? `a ${movement.nombre_personal} ${movement.apellido_personal} V-${movement.cedula_personal}` : ``}
                ${movement.ubicacion_geografica !== null ? `en la Ubic. Geográfica: ${movement.ubicacion_geografica}` : ``}
                ${movement.ubicacion_administrativa !== null ? `en la Ubic. Administrativa: ${movement.ubicacion_administrativa}` : ``} 
                ${movement.departamento !== null ? `en la Ubic. Departamento: ${movement.departamento}` : ``}`
        case 'prestamo': 
            return `El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) hizo el PRÉSTAMO de este activo 
                a ${movement.nombre_personal} ${movement.apellido_personal} V-${movement.cedula_personal} hasta el día ${displayDateRightFormat(movement.tiempo_limite)}. 
                Observaciones o motivo: ${movement.motivo}`
        case 'desincorporacion':
            return `El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) hizo la DESINCORPORACIÓN de este activo 
                en ${movement.ubicacion}. Observaciones o motivo: ${movement.motivo}.`
        case 'reparacion':
            return `El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) mandó a REPARAR este activo 
                en ${movement.ubicacion}. Observaciones o motivo: ${movement.motivo}.`
        case 'salida':
            return `El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) hizo la SALIDA de este activo 
                a ${movement.ubicacion} hasta el día ${displayDateRightFormat(movement.tiempo_limite)}. Observaciones o motivo: ${movement.motivo}`
        default:
            return `El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) Realizó la siguiente acción en este activo: ${movement.tipo}.`
    }
}

function returItemByMovement(movement) {
    return (
        <ListItemText 
            primary={`${displayDateRightFormatWithTime(movement.fecha_movimiento)} | ${returnTextByMovement(movement)}`} 
        />         
    )
}

function generateHistorialItems(movimientos) {
    return movimientos.map((i) => [
        <ListItem button>
            {returItemByMovement(i)}     
        </ListItem>,
        <Divider />
    ])
}

function HistorialMovimientosList(props) {
    const { movimientos } = props;
    return (
        <div>
        {(movimientos.length > 0) ? (
            <List 
                component="nav">
                {generateHistorialItems(movimientos)}
            </List>) : 
            (<Grid item xs={12} style={{ padding: "1%" }}>
                    {'No se han realizado movimientos en este activo.'}
             </Grid>)} 
        </div>
    );
}

export default withStyles(styles)(HistorialMovimientosList);