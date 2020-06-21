import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	alert: {
		width: '25rem',
	},
}));

const SnackAlert = ({ open, setOpen, severity, message }) => {
	const classes = useStyles();

	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<Snackbar
			open={open}
			TransitionComponent={Slide}
			autoHideDuration={6000}
			onClose={handleCloseAlert}
		>
			<Alert
				className={classes.alert}
				onClose={handleCloseAlert}
				severity={severity}
				variant="filled"
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default SnackAlert;
