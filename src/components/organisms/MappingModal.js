import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import translate from "utils/translate";
import Button from "Button";
import Modal from "@material-ui/core/Modal";
import Divisor from "Divisor";
import MenusContainer from "MenusContainer";
import Paper from "@material-ui/core/Paper";
import RelationsBoxList from "RelationsBoxList";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PrimaryButton from "PrimaryButton";

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  padding-left: 20px;
  white-space: pre-line;
`;

const FooterContainer = styled.div`
  padding: 1%;
  width: 100%;
`;

const styles = theme => ({
  paper: {
    [theme.breakpoints.up("xl")]: {
      margin: "5% 10%",
    },
    [theme.breakpoints.down("xl")]: {
      margin: "2% 10%",
    },
  },
});

const Footer = ({ onCancel, onFinalize }) => (
  <FooterContainer>
    <Grid container justify="flex-end">
      <Grid item xs={3}>
        <Grid container>
          <Grid item xs={6}>
            <Button onClick={onCancel}>{translate("cancel")}</Button>
          </Grid>
          <Grid item xs={6}>
            <PrimaryButton onClick={onFinalize} debounce>
              {translate("finalize")}
            </PrimaryButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </FooterContainer>
);

class MappingModal extends React.Component {
  filterToppings = item => {
    if (this.props.rappiSelected.items == null) return false;
    return get(this.props, "rappiSelected.items", []).find(
      i => i.sku === item.sku || item.real === false,
    );
  };

  render() {
    const {
      restaurantItem,
      classes,
      productName,
      rappiSelectedItems,
      compoundItems,
      includeEnabled,
    } = this.props;
    return (
      <Modal open={this.props.open}>
        <Paper className={classes.paper}>
          <Grid container>
            <Title>
              {translate("addToppings")} :{productName}
            </Title>
            <Divisor />
            <MenusContainer
              height="25vh"
              {...this.props}
              rappiSelected={rappiSelectedItems}
              compoundSelected={compoundItems}
              rappiMultiSelectable
              restaurantMultiSelectable={false}
              restaurantSelected={restaurantItem ? [restaurantItem] : []}
              filter={this.filterToppings}
            />
            <Divisor />
            <RelationsBoxList {...this.props} includeEnabled={includeEnabled} />
            <Divisor />
            <Footer {...this.props} />
          </Grid>
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(MappingModal);
