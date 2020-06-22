import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { EmailTextField, RequiredTextField, CopyRight } from '../common';

import { useForm, Controller } from 'react-hook-form';
import { useStyles } from './useStyles';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/actions';

export const SignUp = () => {
	const classes = useStyles();

	// React Hook Form
	const { register, handleSubmit, control, errors } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	// redux
	const dispatch = useDispatch();
	const onSubmit = (signUpDetails) => {
		dispatch(userActions.signUp(signUpDetails));
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.signUpForm} noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<RequiredTextField name="firstName" register={register} error={errors.firstName} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<RequiredTextField name="lastName" register={register} error={errors.lastName} />
						</Grid>
						<Grid item xs={12}>
							<EmailTextField name="email" register={register} error={errors.email} />
						</Grid>
						<Grid item xs={12}>
							<RequiredTextField name="password" register={register} error={errors.password} type="password" />
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="accountRoleLabel" style={{ marginLeft: errors.accountRole ? '1rem' : '0rem' }} error={!!errors.accountRole}>
									Type
								</InputLabel>

								<Controller
									as={
										<Select error={!!errors.accountRole} variant={errors.accountRole ? 'outlined' : 'standard'} label="Type" id="accountRole">
											<MenuItem value={0}>Student</MenuItem>
											<MenuItem value={1}>Instructor</MenuItem>
										</Select>
									}
									name="accountRole"
									rules={{ required: 'This field is required' }}
									control={control}
									defaultValue=""
								/>

								<FormHelperText style={{ marginLeft: errors.accountRole ? '1rem' : '0rem' }} error={!!errors.accountRole}>
									{errors.accountRole ? errors.accountRole.message : 'Select the type of account you want to create'}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/signin" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<CopyRight />
			</Box>
		</Container>
	);
};
