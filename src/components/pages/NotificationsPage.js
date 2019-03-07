import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper/Paper";
import NotificationList from "../organisms/NotificationList"

const styles = () => ({});

const NotificationsPage = ({ notifications }) => (
    <Grid container>
        <Paper style={{ width: "100%", height: "80vh" }}>
            <NotificationList
                notifications={notifications}
            />
        </Paper>
    </Grid>
);

export default withStyles(styles)(NotificationsPage);
