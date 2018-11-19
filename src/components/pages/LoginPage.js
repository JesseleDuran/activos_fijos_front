import React from "react";
import Grid from "@material-ui/core/Grid";
import Bar from "Bar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import LoginForm from "LoginForm";
import translate, { translateKey } from "utils/translate";
import ErrorSnackBar from "ErrorSnackBar";

const styles = theme => ({
  header: {
    padding: theme.spacing.unit * 2.5,
    width: "100%",
  },
  headerText: {
    "text-align": "center",
  },
  formContainer: {
    padding: theme.spacing.unit * 20,
  },
});

const LoginPage = ({ classes, onLogin, error }) => (
  <Grid container>
    <Bar />
    <Grid container justify="center">
      <Paper className={classes.header}>
        <Typography className={classes.headerText}>
          {translate("welcome")}
        </Typography>
      </Paper>
    </Grid>
    <Grid container justify="center" className={classes.formContainer}>
      <LoginForm onLogin={onLogin} />
    </Grid>
    <ErrorSnackBar open={error !== null} message={error} />
  </Grid>
);

export default withStyles(styles)(LoginPage);
