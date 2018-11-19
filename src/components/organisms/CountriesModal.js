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

class CountriesModal extends React.Component {
  state = {
    country: null,
  };

  handleChange = country => this.setState({ country });

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
            <Grid item xs={10} style={{ marginBottom: "5%" }}>
              <Select
                label=""
                options={generateCountryOptions()}
                value={this.state.country}
                onChange={e => this.handleChange(e.target.value)}
              />
            </Grid>

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

const generateCountryOptions = () =>
  Object.keys(countries).map(country => ({
    label: country,
    value: country,
  }));

export default withStyles(styles)(CountriesModal);
