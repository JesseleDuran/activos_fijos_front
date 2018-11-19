import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import trasnlate from "utils/translate";

const SEARCH_WAIT_INTERVAL = 400;

class SearchInput extends Component {
  handleOnChange = value => {
    const { onChange } = this.props;
    clearInterval(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      onChange(value);
    }, SEARCH_WAIT_INTERVAL);
  };

  componentWillMount() {
    this.searchTimer = null;
  }

  componentWillUnmount() {
    clearInterval(this.searchTimer);
  }

  render() {
    const {
      onChange,
      disabled = false,
      classes,
      fullWidth = false,
    } = this.props;
    return (
      <Grid container justify="flex-end" style={{ padding: "0 5px" }}>
        <TextField
          fullWidth={fullWidth}
          disabled={disabled}
          label={trasnlate("find")}
          onChange={e => this.handleOnChange(e.target.value)}
        />
      </Grid>
    );
  }
}

export default SearchInput;
