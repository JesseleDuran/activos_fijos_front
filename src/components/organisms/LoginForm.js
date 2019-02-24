import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divisor from "Divisor";
import Button from "Button";
import PasswordInput from "PasswordInput";

const styles = theme => ({
  frame: {
    maxWidth: 550,
    minHeight: 500,
  },
  container: {
    padding: theme.spacing.unit * 5,
    height: "100%",
  },
  title: {
    padding: theme.spacing.unit * 2,
  },
  loginButton: {
    width: "100%",
  },
  field: {
    width: "100%",
    marginBottom: theme.spacing.unit * 7,
  },
});

class LoginForm extends Component {
  state = {
    showPassword: false,
    email: "",
    password: "",
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render = () => {
    const { email, password } = this.state;
    const { classes, onLogin } = this.props;
    const loginDisabled = email.length === 0 || password.length === 0;
    return (
      <Card className={classes.frame}>
        <Grid
          container
          justify="center"
          alignContent="center"
          alignItems="center"
        >
          <Typography className={classes.title}>
            {'Inicio de Sesión'}
          </Typography>
          <Divisor />

          <form className={classes.container} noValidate autoComplete="true">
            <Grid
              container
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <TextField
                label='Nombre de usuario'
                id="required"
                value={email}
                onChange={this.handleChange("email")}
                className={classes.field}
                type="email"
              />
              <PasswordInput
                onChange={this.handleChange("password")}
                value={password}
                classes={classes}
              />
              <Button
                variant="contained"
                size="large"
                color="primary"
                disabled={loginDisabled}
                className={classes.loginButton}
                onClick={() => onLogin(email, password)}
              >
                {'Iniciar sesión'}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Card>
    );
  };
}

export default withStyles(styles)(LoginForm);
