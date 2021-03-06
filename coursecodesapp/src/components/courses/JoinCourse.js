import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { RequiredTextField } from '../common';
import { courseActions } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const JoinCourse = () => {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// React Hook Form
	const student = useSelector((state) => state.account?.signedAccount);
	const dispatch = useDispatch();
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (codeDetails) => {
		const joinCourseDetails = {
			...codeDetails,
			studentId: student.id,
		};
		console.log(joinCourseDetails);

		dispatch(courseActions.joinCourse(joinCourseDetails));
		handleClose();
	};

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				style={{ background: '#37474f' }}
				startIcon={<AddCircleIcon />}
				onClick={handleClickOpen}
			>
				Join Course
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle style={{ background: '#37474f', color: '#eceff1', padding: '10px' }} id="form-dialog-title">
						Join a Course
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To join a course, please enter the join code provided by your instructor
						</DialogContentText>
						<RequiredTextField name="code" register={register} error={errors.code} variant="standard" />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button color="primary" type="submit" style={{ background: '#37474f' }} variant="contained">
							Join
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};
