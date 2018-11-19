import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import translate from "utils/translate";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

const ActionButtonsContainer = styled.div`
  margin-left: 15px;
`;

const Content = styled(ActionButtonsContainer)`
  margin-bottom: 20px;
`;

class VerticalStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  isLastStep = step => step === this.props.steps.length - 1;

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  renderStep = (step, index) => {
    const { activeStep } = this.state;
    const { classes } = this.props;

    const labelProps = {};

    if (step.isOptional)
      labelProps.optional = (
        <Typography variant="caption">{translate("optional")}</Typography>
      );
    // TODO handle skipped steps - Fede 24/09/2018

    return (
      <Step key={index}>
        <StepLabel {...labelProps}>{step.label}</StepLabel>
        <StepContent>
          <Content>{step.content}</Content>
          <ActionButtonsContainer className={classes.actionsContainer}>
            {activeStep !== 0 && (
              <Button onClick={this.handleBack} className={classes.button}>
                {translate("back")}
              </Button>
            )}
            <Button
              variant="contained"
              disabled={!step.isValid}
              color="primary"
              onClick={
                this.isLastStep(activeStep)
                  ? this.props.onFinish
                  : this.handleNext
              }
              className={classes.button}
            >
              {translate(this.isLastStep(activeStep) ? "finish" : "next")}
            </Button>
          </ActionButtonsContainer>
        </StepContent>
      </Step>
    );
  };

  render() {
    const { classes, steps } = this.props;
    const { activeStep } = this.state;

    return (
      <Paper elevation={2} style={{ width: "100%" }}>
        <Grid container item xs={12} className={classes.root}>
          <Stepper
            activeStep={activeStep}
            className={classes.root}
            orientation="vertical"
          >
            {steps.map(this.renderStep)}
          </Stepper>
        </Grid>
      </Paper>
    );
  }
}

VerticalStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalStepper);
