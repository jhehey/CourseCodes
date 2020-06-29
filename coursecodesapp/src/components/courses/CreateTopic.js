import React from 'react';
import { useForm } from 'react-hook-form';
import { RequiredTextField } from '../common';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	main: {
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(10),
	},
}));

export const CreateTopic = () => {
	const classes = useStyles();

	// React Hook Form
	const { register, handleSubmit, errors } = useForm();

	return (
		<Container maxWidth="sm" className={classes.main}>
			<h1>Create Topic Set</h1>
			<h4>Add a title and description for your problemset</h4>
			<h1>Title</h1>
			<RequiredTextField name="title" register={register} error={errors.title} />
			<h1>Description</h1>
			<RequiredTextField
				name="description"
				register={register}
				error={errors.title}
				multiline={true}
				rows={4}
				rowsMax={6}
			/>
			<Button type="submit" variant="contained" color="secondary">
				Next
			</Button>
		</Container>
	);
};
