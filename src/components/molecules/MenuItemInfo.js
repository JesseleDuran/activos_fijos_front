import React from "react";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit,
  },
  popper: {
    "z-index": 1301, // More than a Modal!
  },
});

const MenuItemInfo = props => {
  const { data, open, reference, classes } = props;
  if (
    !data.metadata ||
    Object.keys(data.metadata).length === 0 ||
    typeof data.metadata === "string"
  )
    return null;
  return (
    <Popper
      open={open}
      anchorEl={reference}
      transition
      className={classes.popper}
      placement="right-start"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.root}>
            {renderMetadata(data.metadata)}
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

const renderMetadata = data => {
  const keys = Object.keys(data);
  return keys.map(
    key =>
      (data[key] !== null) & (data[key] !== "") ? (
        <Typography key={key}>
          {key}:
{data[key]}
        </Typography>
      ) : null,
  );
};

export default withStyles(styles)(MenuItemInfo);
