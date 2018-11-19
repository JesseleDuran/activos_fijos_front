import React, { Component } from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItemInfo from "MenuItemInfo";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChopeddText from "ChoppedText";
import ToggleOff from "@material-ui/icons/RadioButtonUnchecked";
import ToggleOn from "@material-ui/icons/RadioButtonChecked";

const Text = styled.span`
  margin: 0;
`;

const Dot = styled.span`
  font-weight: 800;
  font-size: 18;
  margin: 5px;
`;

class MenuItem extends Component {
  state = {
    infoOpen: false,
    ref: null,
  };

  handleClick = event => {
    const { currentTarget } = event;
    const { isSelected, disabled } = this.props;
    if (!isSelected && !disabled) {
      this.setState({
        infoOpen: !this.state.infoOpen,
        ref: currentTarget,
      });
    }
  };

  onSelect = () => {
    const { onSelect, onCompound, data, isSelected, isCompounded } = this.props;

    if (isCompounded) onCompound(false, data);
    onSelect ? onSelect(!isSelected, data) : null;
    this.setState({ infoOpen: false });
  };

  onCompound = () => {
    const { onCompound, onSelect, isSelected, data, isCompounded } = this.props;
    if (isSelected) onSelect(false, data);
    onCompound ? onCompound(!isCompounded, data) : null;
    this.setState({ infoOpen: false });
  };

  generateBackgroundColor = data => {
    if (data.real === false) return "#16b4975e";
    return data.type === "composed" ? "#f4433691" : "white";
  };

  render = () => {
    const {
      data,
      idKey,
      style,
      isSelected,
      isCompounded,
      onCompound,
    } = this.props;
    const styleModified = {
      ...style,
      background: this.generateBackgroundColor(data),
    };
    const { infoOpen, ref } = this.state;
    return (
      <Grid
        container
        style={styleModified}
        alignItems="center"
        title={data.name}
      >
        {onCompound && (
          <Checkbox
            type="checkbox"
            checked={isCompounded}
            icon={<ToggleOff />}
            checkedIcon={<ToggleOn />}
            onClick={this.onCompound}
          />
        )}
        <Checkbox
          type="checkbox"
          label={data[idKey]}
          checked={isSelected}
          onClick={this.onSelect}
        />

        <Typography>
          <Text onClick={this.onSelect}>{data[idKey]}</Text>
          <Dot>·</Dot>
          <Text onClick={this.handleClick}>
            <ChopeddText text={data.name} length={30} />
          </Text>
          <Dot>·</Dot>
          <Text>$
{data.price ? data.price : 0}
</Text>
          <MenuItemInfo open={infoOpen} data={data} reference={ref} />
        </Typography>
      </Grid>
    );
  };
}

export default MenuItem;
