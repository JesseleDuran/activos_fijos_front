import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { translateKey } from "utils/translate";
import * as PropTypes from "prop-types";
import SearchInput from "./SearchInput";

const styles = () => ({
  formControl: {
    width: "100%",
  },
});

const MAX_VISIBLE_ITEMS = 7;

class ControlledSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      open: false,
      options: props.options,
    };
    this.searchField = null;
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ options: nextProps.options, value: nextProps.value });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.onChange(event);
  };

  handleSearchChange = text => {
    const { options } = this.props;
    const newOptions = options.filter(i =>
      i.label.toLowerCase().includes(text.toLowerCase()),
    );

    this.setState({
      options: newOptions,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true }, () => {
      if (this.searchField != null) this.searchField.focus();
    });
  };

  renderOptions = options =>
    options.map(option => (
      <MenuItem value={option.value} key={option.label}>
        {option.label}
      </MenuItem>
    ));

  renderWithOptions = () => {
    const { classes, label, disabled } = this.props;
    const { options } = this.state;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={this.state.value}
          onChange={this.handleChange}
          disabled={disabled}
        >
          <SearchInput fullWidth onChange={this.handleSearchChange} />
          {this.renderOptions(options.slice(0, MAX_VISIBLE_ITEMS))}
        </Select>
      </FormControl>
    );
  };

  renderEmpty = () => {
    const { classes, label } = this.props;
    const theresNoOptionsString = translateKey("theresNoOptions");
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
        <Select value={theresNoOptionsString} disabled>
          <MenuItem value={theresNoOptionsString} key={theresNoOptionsString}>
            {theresNoOptionsString}
          </MenuItem>
        </Select>
      </FormControl>
    );
  };

  render() {
    const { options } = this.props;
    return options.length > 0 ? this.renderWithOptions() : this.renderEmpty();
  }
}

ControlledSelect.propTypes = {
  classes: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
};

export default withStyles(styles)(ControlledSelect);
