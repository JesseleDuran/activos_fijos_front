import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Warning from '@material-ui/icons/Warning';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

function generateNotificationsItems(notifications) {
    return notifications.map((i, ind) => [
        <ListItem button>
                <ListItemIcon>
                    <Warning />
                </ListItemIcon>
                <ListItemText 
                    primary={`¡El activo ${i.data.n_activo} está a punto de terminar su vida útil! Le faltan ${i.data.vida_util_faltante_dias} días.`} />         
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
            <List 
                component="nav">
                {generateNotificationsItems(notifications)}
            </List>
        </div>
    );
}

export default withStyles(styles)(NotificationList);