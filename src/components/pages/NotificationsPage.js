import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ReactTable from "react-table";
import NotificationList from "../organisms/NotificationList"
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({});

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
