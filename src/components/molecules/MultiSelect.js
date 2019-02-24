import React from "react";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
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

class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: props.values || [],
            open: false,
            options: props.options,
        };
        this.searchField = null;
    }

    componentWillReceiveProps = nextProps => {
        this.setState({ options: nextProps.options });
    };

    handleChange = event => {
        this.setState({ values: event.target.value }, () => {
            this.props.onChange(this.state.values);
        });

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
            <MenuItem value={option.value} key={option.value}>
                <Checkbox checked={this.state.values.indexOf(option.value) > -1}/>
                <ListItemText primary={option.label}/>
            </MenuItem>
        ));

    renderValues = selected => {
        const { options } = this.props;
        return selected.map(value => {
            return options.find(i => {
                return i.value === value;
            }).label;
        }).join(", ");
    };

    renderWithOptions = () => {
        const { classes, label, disabled } = this.props;
        const { options } = this.state;
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
                <Select
                    multiple
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.values}
                    renderValue={this.renderValues}
                    onChange={this.handleChange}
                    disabled={disabled}
                >
                    <SearchInput fullWidth onChange={this.handleSearchChange}/>
                    {this.renderOptions(options)}
                </Select>
            </FormControl>
        );
    };

    renderEmpty = () => {
        const { classes, label } = this.props;
        const theresNoOptionsString = "No Hay opciones disponibles";
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

MultiSelect.propTypes = {
    classes: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    label: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired,
};

export default withStyles(styles)(MultiSelect);
