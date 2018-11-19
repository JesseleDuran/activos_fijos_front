import React from "react";
import styled from "styled-components";
import translate from "utils/translate";
import PrimaryButton from "PrimaryButton";
import Modal from "@material-ui/core/Modal";
import Divisor from "Divisor";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Select from "Select";
import { Button } from "@material-ui/core";
import { environments } from "../../constants";

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

class PromoteModal extends React.Component {
  state = {
    environment: null,
  };

  environmentOptions = Object.values(environments).map(environment => ({
    label: environment,
    value: environment,
  }));

  handleChange = environment => this.setState({ environment });

  render() {
    const {
      classes,
      open,
      version = {},
      onSelectEnvironment,
      onClose,
    } = this.props;
    return (
      <Modal open={open}>
        <Paper className={classes.paper}>
          <Grid container justify="center">
            <Grid item>
              <Title>Promover de Ambiente</Title>
            </Grid>
            <Divisor />
            <Grid item>
              <Title>Ambiente Actual</Title>
            </Grid>
            <Grid item xs={10} style={{ marginBottom: "5%" }}>
              <p>{version.environment}</p>
            </Grid>
            <Grid item>
              <Title>Cambiar a </Title>
            </Grid>
            <Grid item xs={10} style={{ marginBottom: "5%" }}>
              <Select
                label=""
                options={this.environmentOptions}
                value={this.state.environment}
                onChange={e => this.handleChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} container justify="center">
              <Grid
                item
                xs={6}
                container
                justify="center"
                style={{ marginBottom: "5%" }}
              >
                <Button onClick={() => onClose()}>{translate("close")}</Button>
              </Grid>
              <Grid
                item
                xs={6}
                container
                justify="center"
                style={{ marginBottom: "5%" }}
              >
                <PrimaryButton
                  onClick={() => {
                    onSelectEnvironment(this.state.environment);
                    this.setState({ environment: null });
                  }}
                  disabled={!this.state.environment}
                  debounce
                >
                  {translate("select")}
                </PrimaryButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(PromoteModal);
