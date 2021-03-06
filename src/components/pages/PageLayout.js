import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles, AppBar, Paper } from "@material-ui/core";
import ErrorSnackBar from "../molecules/ErrorSnackBar";
import PageTitle from "../atoms/PageTitle";
import Bar from "../atoms/Bar";
import PageLoader from "../molecules/PageLoader";

import SideMenu, { width as drawerWidth } from "../organisms/SideMenu";

const styles = theme => ({
  	root: {
		width: "100%",
    	height: "100vh",
    	overflow: "hidden",
    	zIndex: "1",
  	},
  	appFrame: {
    	zIndex: 1,
    	overflow: "hidden",
    	position: "relative",
    	display: "flex",
    	width: "100%",
    	height: "auto",
  	},

  	appBar: {
    	width: `calc(100% - ${drawerWidth}px)`,
    	marginLeft: drawerWidth,
    	marginTop: "30px",
  	},
  	paperToolbar: {
    	borderRadius: 0,
    	padding: theme.spacing.unit,
    	minHeight: "19px",
  	},

  	content: {
    	flexGrow: 1,
    	backgroundColor: theme.palette.background.default,
    	padding: theme.spacing.unit * 3,
    	position: "relative",
    	height: `calc(100vh - 80px)`,
    	overflow: "auto",
    	marginTop: "35px",
  	},
});

const PageLayout = ({
  user,
  title,
  children,
  loading,
  error,
  classes,
}) => (
	<div className={classes.root}>
    	<Bar />
    	<div className={classes.appFrame}>
      		<PageLoader active={loading} />
      		<AppBar className={classes.appBar}>
				<Paper className={classes.paperToolbar}>
					<Grid container item xs={12} />
				</Paper>
      		</AppBar>
      		<SideMenu user={user} />
			<main className={classes.content}>
				{title && <PageTitle title={title} />}
				{children}
			</main>
    	</div>
    	<ErrorSnackBar open={error} message={error} />
  	</div>
);

export default withStyles(styles)(withRouter(PageLayout));
