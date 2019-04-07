import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ErrorSnackBar from "../molecules/ErrorSnackBar";
import Bar from "../atoms/Bar";
import LoginForm from "../organisms/LoginForm";


const styles = theme => ({
  	header: {
    	padding: theme.spacing.unit * 2.5,
    	width: "100%",
  	},
  	headerText: {
   		"text-align": "center",
  	},
  	formContainer: {
		paddingTop: 20,
		paddingRight: theme.spacing.unit * 20,
		paddingBottom: theme.spacing.unit * 20,
		paddingLeft: theme.spacing.unit * 20
	},
	image:{
		paddingTop: 20,
		maxHeight: 100, 
		maxWidth: 100,
		display: 'block',
		margin: 'auto'

	}
	  
});

const LoginPage = ({ classes, onLogin, error }) => (
	<Grid container>
    	<Bar />
    	<Grid container justify="center">
			<Paper className={classes.header}>
				<Typography className={classes.headerText}>
					{'Bienvenido al Módulo de Activos Fijos'}
				</Typography>
			</Paper>
    	</Grid>
		<img 
			src ="http://maderasdelorinoco.gob.ve/media/com_allvideoshare/gestion-al-dia/maderas_del_orinoco.png" 
			alt=""
			className={classes.image}
		/>
    	<Grid container justify="center" className={classes.formContainer}>
      		<LoginForm onLogin={onLogin} />
    	</Grid>
    	<ErrorSnackBar open={error !== null} message={error} />
  	</Grid>
);

export default withStyles(styles)(LoginPage);
