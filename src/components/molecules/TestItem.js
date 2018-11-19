import React, { Component } from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import request from "api/request";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import MenuItem from "@material-ui/core/MenuItem";

class TestItem extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState(state => ({ open: !state.open }));
  };

  renderOrder = (item, order, orderSelected, responses) => (
    <Collapse
      in={this.state.open}
      timeout="auto"
      unmountOnExit
      style={{ padding: 0 }}
    >
      <List component="div" disablePadding>
        <MenuItem
          button
          onClick={() => this.props.openOrder(order)}
          selected={orderSelected && orderSelected.id === order.id}
        >
          <ListItemIcon>
            {responses[order.id] && responses[order.id].success ? (
              <CheckIcon style={{ color: "green" }} />
            ) : (
              <ErrorIcon style={{ color: "red" }} />
            )}
          </ListItemIcon>
          <ListItemText inset primary={`order #${order.id}`} />
        </MenuItem>
      </List>
    </Collapse>
  );

  generateExpandIcon = item => {
    if (item.orders.length === 0) return null;
    return item.open ? <ExpandLess /> : <ExpandMore />;
  };

  generateItemName = (item, responses) => {
    const successCount = item.orders.reduce(
      (p, n) => (responses[n.id] && responses[n.id].success ? p + 1 : p),
      0,
    );
    const ordersCount = item.orders.length;
    const color = this.generateColor(ordersCount, successCount);
    return (
      <p>
        {item.name}
        <span style={{ color, marginLeft: "5px", fontWeight: "600" }}>
          {`${successCount}/${ordersCount}`}
        </span>
      </p>
    );
  };

  generateColor = (total, success) => {
    const sustracction = total - success;
    switch (sustracction) {
      case 0:
        return "green";
      case total:
        return "red";
      default:
        return "orange";
    }
  };

  isSelected = (item, order) =>
    order ? item.orders.some(o => o.id === order.id) : false;

  render = () => {
    const { item, order, responses } = this.props;
    return (
      <List disablePadding>
        <MenuItem
          button
          onClick={() => this.handleOpen(item)}
          selected={this.isSelected(item, order)}
        >
          <ListItemText primary={this.generateItemName(item, responses)} />
          {this.generateExpandIcon(item)}
        </MenuItem>
        {item.orders.map(o => this.renderOrder(item, o, order, responses))}
      </List>
    );
  };
}

export default TestItem;
