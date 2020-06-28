import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import { EmailTextField, RequiredTextField, CopyRight } from '../common';

import { useForm } from 'react-hook-form';
import { useStyles } from './useStyles';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/actions';
import { Redirect } from 'react-router-dom';

export const SignIn = () => {
	const classes = useStyles();

	// React Hook Form
	const { register, handleSubmit, errors } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	// redux
	const dispatch = useDispatch();
	const onSubmit = (signInDetails) => {
		dispatch(userActions.signIn(signInDetails));
	};

	const { signedIn } = useSelector((state) => state.authentication);

	return signedIn ? (
		<Redirect to="/" />
	) : (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.signInForm} noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<EmailTextField name="email" register={register} error={errors.email} autoFocus={true} />
						</Grid>
						<Grid item xs={12}>
							<RequiredTextField name="password" register={register} error={errors.password} type="password" />
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
						</Grid>

						<Grid item xs={12}>
							<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
								Sign In
							</Button>
						</Grid>

						<Grid item xs={12}>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="/signup" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<CopyRight />
			</Box>
		</Container>
	);
};
