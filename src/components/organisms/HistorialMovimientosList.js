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
        case 'salida':
            return (
                <ListItemText 
                    primary={`${displayDateRightFormatWithTime(movement.fecha_movimiento)} | El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) hizo la salida de este activo a ${movement.ubicacion} hasta el día ${displayDateRightFormat(movement.tiempo_limite)}. Observaciones o motivo: ${movement.motivo}`} 
                />          
            )    
        default:
            return (
                <ListItemText 
                    primary={`${displayDateRightFormatWithTime(movement.fecha_movimiento)} | El usuario ${movement.nombre_usuario} ${movement.apellido_usuario} (@${movement.cod_usuario_aprobador}) Realizó la siguiente acción en este activo: ${movement.tipo}.`} 
                />         
            )
    }
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