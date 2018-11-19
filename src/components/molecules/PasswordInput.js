import React, { Component } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import translate from "utils/translate";

class PasswordInput extends Component {
  state = {
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render = () => {
    const { value, onChange, classes } = this.props;
    return (
      <FormControl className={classes.field}>
        <InputLabel htmlFor="adornment-password">
          {translate("password")}
        </InputLabel>
        <Input
          id="adornment-password"
          type={this.state.showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
  <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
</InputAdornment>
          }
        />
      </FormControl>
    );
  };
}

export default PasswordInput;
