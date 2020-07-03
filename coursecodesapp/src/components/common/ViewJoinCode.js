import React, { useEffect } from 'react';
import {
	Button,
	Dialog,
	Typography,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { RequiredTextField } from './';
import { useSelector, useDispatch } from 'react-redux';
import { joinCodeActions } from '../../redux/actions';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	code: {
		textAlign: 'center',
	},
}));

export const ViewJoinCode = () => {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// React Hook Form
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(joinCodeActions.generateJoinCode(courseId));
	};

	// get join code for the current course
	const { courseId } = useParams();
	const joinCode = useSelector((state) => state.joinCode?.code);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(joinCodeActions.getJoinCode(courseId));
	}, [dispatch, courseId]);

	return (
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				View Join Code
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<form noValidate onSubmit={onSubmit}>
					<DialogTitle id="form-dialog-title">Join Code</DialogTitle>
					<DialogContent>
						<DialogContentText>Give this code to your students to let them join the course</DialogContentText>
						<Typography variant="h4" className={classes.code}>
							{joinCode || 'GENERATE CODE'}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Close
						</Button>
						<Button color="primary" type="submit">
							Generate New Code
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};
