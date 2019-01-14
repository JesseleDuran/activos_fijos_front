import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import translate from "utils/translate";

const styles = theme => ({
	formControl: {
		width: "100%",
		padding: "1%"
	}
});

class ControlledSelect extends React.Component {
	state = {
		value: "",
		open: false
	};

	handleChange = event => {
		this.setState({ value: event.target.value });
		this.props.handleChange;
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleRenderOptions(nameOption, options) {
		switch (nameOption) {
			case 'ubicaciones':
				return <Ubicaciones ubicaciones={options}></Ubicaciones>
				break;
		
			default:
				break;
		}
	}

	render() {
		const { classes, label, nameOption, options } = this.props;

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
						{this.handleRenderOptions(nameOption, options)}
					</Select>
				</FormControl>
			</form>
		);
	}
}

const Ubicaciones = ({ ubicaciones }) => {
    return (
        ubicaciones.map(({ codubifis, desubifis }) => (
            <MenuItem key={codubifis} value={codubifis}>
                {desubifis}
            </MenuItem>
        ))
    )
}

export default withStyles(styles)(ControlledSelect);
