import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as PropTypes from "prop-types";
import SearchInput from "./SearchInput";

const styles = () => ({
    formControl: {
        width: "100%",
    },
});

class HttpSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || "",
            open: false,
            options: [],
        };
        this.searchField = null;
    }

    componentWillReceiveProps = nextProps => {
        this.setState({ value: nextProps.value });
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
        this.props.onChange(event);
    };

    handleSearchChange = text => {
        if (text.length >= this.props.minLength) {
            this.props.fetch(text).then(options => {
                this.setState({
                    options: options || [],
                });
            });
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true }, () => {
            if (this.searchField != null) this.searchField.focus();
        });
    };

    renderOptions = options => options.map(option => (
        <MenuItem value={option[this.props.itemKey]} key={option[this.props.itemKey]}>
            {this.props.itemLabel(option)}
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
                    <SearchInput fullWidth onChange={this.handleSearchChange}/>
                    {this.renderOptions(options)}
                </Select>
            </FormControl>
        );
    };

    render() {
        return this.renderWithOptions();
    }
}

HttpSelect.propTypes = {
    classes: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    label: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
};

export default withStyles(styles)(HttpSelect);
