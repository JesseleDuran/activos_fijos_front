import ListItem from "@material-ui/core/ListItem/ListItem";
import Icon from "@material-ui/core/Icon/Icon";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import React, { Component } from "react";
import Collapse from "@material-ui/core/Collapse";
import * as PropTypes from "prop-types";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const SideMenuItem = ({ label, icon, to, history, items, level = 1 }) => {
  const goTo = () => history.push(to);

  const isActive = history.location.pathname === to;
  return items != null ? (
    <ListMenu
      label={label}
      icon={icon}
      history={history}
      items={items}
      goTo={goTo}
      isActive={isActive}
      level={level}
    />
  ) : (
    renderAsSingleItem({ label, icon, to, history, goTo, isActive, level })
  );
};

const renderAsSingleItem = ({
  label,
  icon,
  to,
  history,
  goTo,
  isActive,
  level,
}) => (
  <ListItem
    button
    onClick={goTo}
    style={{ height: "6vh", paddingLeft: 8 * level + "px" }}
  >
    <Icon color={isActive ? "primary" : "action"}>{icon}</Icon>
    <ListItemText
      primary={label}
      style={{ fontWeight: isActive ? 500 : 300 }}
    />
  </ListItem>
);

class ListMenu extends Component {
  state = {
    open: false,
  };

  handleClick = () => this.setState(state => ({ open: !state.open }));

  render() {
    const {
      label,
      icon,
      to,
      history,
      items,
      goTo,
      isActive,
      level,
    } = this.props;
    return [
      <ListItem
        button
        onClick={this.handleClick}
        style={{ height: "6vh", paddingLeft: 8 * level + "px" }}
      >
        <Icon color={isActive ? "primary" : "action"}>{icon}</Icon>
        <ListItemText
          primary={label}
          style={{ fontWeight: isActive ? 500 : 300 }}
        />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>,
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map(i => (
            <SideMenuItem {...i} history={history} level={level + 1} />
          ))}
        </List>
      </Collapse>,
    ];
  }
}

SideMenuItem.propTypes = {
  label: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

export default SideMenuItem;
