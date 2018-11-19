import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import styled from "styled-components";
import withStyles from "@material-ui/core/styles/withStyles";

const Item = styled.span`
  position: relative;
  color: #000;

  &:not(:last-child)::after {
    position: absolute;
    content: "»";
    right: 3px;
  }
`;

const ItemLabel = styled.span`
  font-weight: 300;
  font-size: 13px;
  margin-right: 5px;
`;

const ItemValue = styled.span`
  font-weight: 600;
  font-size: 13px;
  margin-right: 15px;
`;

const styles = theme => ({
  value: {
    color: theme.palette.secondary.dark,
  },
});

class InlineItemsDisplay extends React.Component {
  renderItem = (item, index) => (
    <Item key={index}>
      <ItemLabel>{item.label}
:
</ItemLabel>
      <ItemValue className={this.props.classes.value}>{item.value}</ItemValue>
    </Item>
  );

  render() {
    const { items } = this.props;
    return (
      <Grid container item xs={12}>
        {items.map(this.renderItem)}
      </Grid>
    );
  }
}

export default withStyles(styles)(InlineItemsDisplay);
