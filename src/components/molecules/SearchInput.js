import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const SEARCH_WAIT_INTERVAL = 400;

class SearchInput extends Component {
    componentWillMount() {
        this.searchTimer = null;
    }

    componentWillUnmount() {
        clearInterval(this.searchTimer);
    }

    handleOnChange = value => {
        const { onChange } = this.props;
        clearInterval(this.searchTimer);
        this.searchTimer = setTimeout(() => {
            onChange(value);
        }, SEARCH_WAIT_INTERVAL);
    };

    render() {
        const {
            disabled = false,
            fullWidth = false,
        } = this.props;
        return (
            <Grid container style={{ padding: "0 5px" }}>
                <TextField
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label='Buscar'
                    onChange={e => this.handleOnChange(e.target.value)}
                />
            </Grid>
        );
    }
}

export default SearchInput;
