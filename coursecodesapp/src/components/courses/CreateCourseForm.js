import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { RequiredTextField } from '../common';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { courseActions } from '../../redux/actions';

export default function CreateCourseForm() {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { signedAccount: signedInstructor } = useSelector((state) => state.account);

	// React Hook Form
	const { register, handleSubmit, errors } = useForm();

	// dispatch create course action with form details and instructor id
	const dispatch = useDispatch();
	const onSubmit = (courseDetails) => {
		const courseToCreate = {
			instructorId: signedInstructor.id,
			...courseDetails,
		};
		dispatch(courseActions.createCourse(courseToCreate));
	};

	const closeForm = useSelector((state) => state.course?.closeForm);
	if (closeForm && open) {
		handleClose();
		dispatch(courseActions.enableFormOpen());
	}

	return (
		<div>
			<Button
				variant="contained"
				style={{ background: '#37474f', color: '#eceff1', padding: '10px' }}
				startIcon={<AddCircleIcon />}
				onClick={handleClickOpen}
			>
				Create a Course
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle style={{ background: '#37474f', color: '#eceff1', padding: '10px' }} id="form-dialog-title">
						Create a Course
					</DialogTitle>
					<DialogContent>
						<RequiredTextField name="courseName" register={register} error={errors.courseName} margin="dense" />
						<RequiredTextField name="term" register={register} error={errors.term} margin="dense" />
						<RequiredTextField name="section" register={register} error={errors.section} margin="dense" />
						<RequiredTextField
							name="capacity"
							register={register}
							error={errors.capacity}
							margin="dense"
							type="number"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button color="primary" variant="contained" type="submit">
							Create
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
