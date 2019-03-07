import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Warning from '@material-ui/icons/Warning';
import Grid from "@material-ui/core/Grid";

const styles = () => ({
    root: {
        width: '100%',
    },
});

function returItemByNotificationType(notification) {
    switch (notification.tipo) {
        case 'fin_prestamo':
            return (
                <ListItemText 
                    primary={`¡El préstamo del activo ${notification.data.n_activo} está a punto de terminar! Le faltan ${notification.data.tiempo_faltante_retorno} días.`} />        
            )
        case 'fin_vida_util':
            return (
                <ListItemText 
                    primary={`¡El activo ${notification.data.n_activo} está a punto de terminar su vida útil! Le faltan ${notification.data.vida_util_faltante_dias} días.`} />
            )
        default:
            return (
                <ListItemText 
                    primary={`¡El activo ${notification.data.n_activo} está a punto de terminar su vida útil!`} />       
            )
    }
}

function generateNotificationsItems(notifications) {
    return notifications.map((i) => [
        <ListItem button>
            <ListItemIcon>
                <Warning />
            </ListItemIcon>
                {returItemByNotificationType(i)}     
        </ListItem>,
        <Divider />
    ])
}

function NotificationList(props) {
    const { notifications } = props;
    notifications.map(i => (
        i.data = JSON.parse(i.data)
    ))

    return (
        <div>
        {(notifications.length > 0) ? (
            <List 
                component="nav">
                {generateNotificationsItems(notifications)}
            </List>) : 
            (<Grid item xs={12} style={{ padding: "1%" }}>
                    {'No hay notificaciones por el momento.'}
            </Grid>)} 
        </div>
    );
}

export default withStyles(styles)(NotificationList);