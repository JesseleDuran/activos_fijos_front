import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import * as PropTypes from "prop-types";
import translate from "../../utils/translate";
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
          alt="Adelle Charles"
          src={
            "https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2014/materialdesign_principles_metaphor.png"
          }
          style={{
            width: 60,
            height: 60,
          }}
        />
        <ListItemText
          primary={user.name
            .replace(".", " ")
            .replace(/\b\w/g, l => l.toUpperCase())}
          secondary={user.name}
          secondaryTypographyProps={{
            title: user.name,
            style: { overflow: "hidden", textOverflow: "ellipsis" },
          }}
        />
      </ListItem>
      <Divider />
      {renderMenuItems()}
      <Divider />
      <SideMenuItem
        to="/logout"
        label="Cerrar Sesion"
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
