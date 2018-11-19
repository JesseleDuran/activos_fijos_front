import React from "react";
import styled from "styled-components";
import translate from "utils/translate";
import PrimaryButton from "PrimaryButton";
import Modal from "@material-ui/core/Modal";
import Divisor from "Divisor";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TestTable from "TestTable";
import countries from "utils/countryLocationValues";
import Select from "Select";

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  padding-left: 20px;
`;

const FooterContainer = styled.div`
  padding: 1%;
  width: 100%;
`;

const styles = theme => ({
  paper: {
    margin: "10% 35%",
  },
});

class ComposedProductsModal extends React.Component {
  state = {
    country: null,
  };

  render() {
    const { classes, onSelectCountry } = this.props;
    return (
      <Modal open={this.props.open}>
        <Paper className={classes.paper}>
          <Grid container justify="center">
            <Grid item>
              <Title>{translate("countries.title")}</Title>
            </Grid>
            <Divisor />

            <Grid item style={{ marginBottom: "5%" }}>
              <PrimaryButton
                onClick={() => onSelectCountry(this.state.country)}
                disabled={!this.state.country}
                debounce
              >
                {translate("select")}
              </PrimaryButton>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(ComposedProductsModal);
