import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.error.dark,
    padding: theme.spacing.unit * 3,
    color: "white !important",
  },
  icon: {
    fontSize: 20,
    color: "white",
  },

  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  close: {
    display: "flex",
    alignItems: "flex-start",
  },
});

class ErrorSnackBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "",
    };
  }

  componentWillReceiveProps = ({ message }) => {
    this.setState(state => {
      return {
        open: !!message,
        message: message || state.message,
      };
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, message } = this.state;
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
      >
        <Paper className={classes.container}>
          <Grid container>
            <Grid item xs={10}>
              {message}
            </Grid>
            <Grid item container xs={2}>
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
                className={classes.close}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Snackbar>
    );
  }
}

export default withStyles(styles)(ErrorSnackBar);
