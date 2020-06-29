import React from 'react';
import { RequiredTextField } from '../common';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { courseActions } from '../../redux/actions';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	main: {
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(10),
	},
}));

export const CreateCourse = () => {
	// TODO: Handle validation error sa pag create ng course

	const classes = useStyles();
	const { signedInstructor } = useSelector((state) => state.instructor);

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

	const courseCreated = useSelector((state) => state.course?.courseCreated);

	return (
		<Container maxWidth="sm" className={classes.main}>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<h1>Create Course</h1>
				<h1>Title</h1>
				<RequiredTextField name="title" register={register} error={errors.title} />
				<h1>Description</h1>
				<RequiredTextField
					name="description"
					register={register}
					error={errors.title}
					multiline={true}
					rows={6}
					rowsMax={6}
				/>
				<Button type="submit" variant="contained" color="secondary">
					Create
				</Button>
			</form>
			{courseCreated && <Redirect to="/courses" />}
		</Container>
	);
};
