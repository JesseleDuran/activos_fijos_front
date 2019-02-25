import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import * as PropTypes from "prop-types";
import SideMenuItem from "../molecules/SideMenuItem";
import routes from "../../constants/routes";

export const width = 280;

const styles = () => ({
    root: {
        position: "relative",
        width,
    },
});

const SideMenu = ({ user, classes, history }) => {
    const renderMenuItems = () =>
        routes.map(menuItem => (
            <SideMenuItem
                key={menuItem.to}
                to={menuItem.to}
                items={menuItem.items}
                label={menuItem.label}
                icon={menuItem.icon}
                history={history}
            />
        ));

    return (
        <Drawer variant="permanent" classes={{ paper: classes.root }} anchor="left">
            <ListItem style={{ height: "120px", padding: "16px" }}>
                <Avatar
                    src="http://www.cvg.gob.ve/sites/default/files/Loago%20azul%20cvg.jpg"
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
                <ListItemText
                    primary={`${user.nomusu} ${user.apeusu}`
                        .replace(".", " ")
                        .replace(/\b\w/g, l => l.toUpperCase())}
                    secondary={`@${user.codusu}`}
                    secondaryTypographyProps={{
                        title: `@${user.codusu}`,
                        style: { overflow: "hidden", textOverflow: "ellipsis" },
                    }}
                />
            </ListItem>
            <Divider/>
            {renderMenuItems()}
            <Divider/>
            <SideMenuItem
                to="/logout"
                label="Cerrar sesión"
                icon="exit_to_app"
                history={history}
            />
        </Drawer>
    );
};

SideMenu.propTypes = {
    classes: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
    user: PropTypes.any.isRequired,
};

export default withStyles(styles)(withRouter(SideMenu));
