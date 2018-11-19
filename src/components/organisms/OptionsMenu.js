import React from "react";
import uniaueId from "lodash/uniqueId";
import styled from "styled-components";
import Menu from "@material-ui/core/Menu/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MaterialMenuItem from "@material-ui/core/MenuItem/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Fade from "@material-ui/core/Fade";
import Icon from "@material-ui/core/Icon/Icon";

const StyledMenu = styled(Menu)`
  position: relative;
  left: -190px !important;
`;

class OptionsMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  getOptionClickHandler = option => () => {
    this.setState({ anchorEl: null });
    option.onClick();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderMenuItem = option => (
    <MaterialMenuItem
      key={uniaueId()}
      onClick={this.getOptionClickHandler(option)}
    >
      <ListItemIcon>
        <Icon>{option.icon}</Icon>
      </ListItemIcon>
      <ListItemText inset primary={option.name} />
    </MaterialMenuItem>
  );

  shouldRenderMenu() {
    const { options } = this.props;
    return options && options.length > 0;
  }

  render() {
    const { anchorEl } = this.state;
    const { options } = this.props;

    return this.shouldRenderMenu() ? (
      <div>
        <IconButton
          aria-label="More"
          aria-haspopup="true"
          onClick={this.handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          {options.map(this.renderMenuItem)}
        </StyledMenu>
      </div>
    ) : null;
  }
}

export default OptionsMenu;
