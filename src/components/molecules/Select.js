import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
	formControl: {
		width: "100%"
	}
});

class ControlledSelect extends React.Component {
	state = {
		value: "",
		open: false
	};

	handleChange = event => {
		this.setState({ value: event.target.value });
		this.props.onChange(event);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	render() {
		const { classes, label, options } = this.props;

		return (
			<form autoComplete="off">
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
					<Select
						open={this.state.open}
						onClose={this.handleClose}
						onOpen={this.handleOpen}
						value={this.state.value}
						onChange={this.handleChange}
					>
						{renderOptions(options)}
					</Select>
				</FormControl>
			</form>
		);
	}
}

const renderOptions = options => {
	return options.map(option => (
		<MenuItem value={option.value} key={option.value}>
			{option.label}
		</MenuItem>
	));
};

export default withStyles(styles)(ControlledSelect);
