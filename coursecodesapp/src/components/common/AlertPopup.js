import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
	alert: {
		width: '25rem',
	},
}));

export const AlertPopup = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { open, severity, message, vertical, horizontal } = useSelector((state) => state.alert);

	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(alertActions.clear());
	};

	return (
		<Snackbar open={open} TransitionComponent={Slide} onClose={handleCloseAlert} anchorOrigin={{ vertical, horizontal }}>
			<Alert className={classes.alert} onClose={handleCloseAlert} severity={severity} variant="filled">
				{message}
			</Alert>
		</Snackbar>
	);
};
