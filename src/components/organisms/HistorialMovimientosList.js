import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { displayDateRightFormatWithTime, displayDateRightFormat } from "../../utils/dates"

const styles = theme => ({
  root: {
    width: '100%',
  },
});

function returItemByMovement(movement) {
    switch (movement.tipo) {
        case 'asignacion':
            return (
                <ListItemText 
                    primary={`${displayDateRightFormatWithTime(movement.fecha_movimiento)} | El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) asignó este activo.`} 
                />         
            )
        case 'reasignacion':
            return (
                <ListItemText 
                    primary={`${displayDateRightFormatWithTime(movement.fecha_movimiento)} | El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) reasignó este activo.`} 
                />         
            )
        case 'prestamo':
            return (
                <ListItemText 
                    primary={`${displayDateRightFormatWithTime(movement.fecha_movimiento)} | El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) hizo el préstamo de este activo a ${movement.nombre_personal} ${movement.apellido_personal} hasta el día ${displayDateRightFormat(movement.tiempo_limite)}. Observaciones o motivo: ${movement.motivo}`} 
                />         
            )
        case 'desincorporacion':
            return (
                <ListItemText 
                    primary={`${displayDateRightFormatWithTime(movement.fecha_movimiento)} | El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) hizo la desincorporación de este activo en ${movement.ubicacion}. Observaciones o motivo: ${movement.motivo}.`} 
                />         
            )
        case 'reparacion':
            return (
                <ListItemText 
                    primary={`${displayDateRightFormatWithTime(movement.fecha_movimiento)} | El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) mandó a reparar este activo en ${movement.ubicacion}. Observaciones o motivo: ${movement.motivo}.`} 
                />         
            )
        default:
    }
}

function generateHistorialItems(movimientos) {
    return movimientos.map((i, ind) => [
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
            <List 
                component="nav">
                {generateHistorialItems(movimientos)}
            </List>
        </div>
    );
}

export default withStyles(styles)(HistorialMovimientosList);