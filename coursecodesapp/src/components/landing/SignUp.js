import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Avatar,
	Button,
	CssBaseline,
	Link,
	Grid,
	Box,
	Typography,
	Container,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@material-ui/core';
import { EmailTextField, RequiredTextField, CopyRight } from '../common';
import { Parallax } from 'react-parallax';

import { useForm, Controller } from 'react-hook-form';
import { useStyles } from './useStyles';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import { Role } from '../../helpers';

export const SignUp = () => {
	const classes = useStyles();

	// React Hook Form
	const { register, handleSubmit, control, errors } = useForm({
		mode: 'onChange',
	});

	// redux
	const dispatch = useDispatch();
	const onSubmit = (signUpDetails) => {
		dispatch(accountActions.signUp(signUpDetails));
	};
	const { signedUp } = useSelector((state) => state.account);

	return signedUp ? (
		<Redirect to="/signin" />
	) : (
		<Parallax
			filter
			strength={500}
			bgImage={
				'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'
			}
			className={classes.hero2}
		>
			<Container component="main" maxWidth="xs" className={classes.container}>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<form className={classes.signUpForm} noValidate onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<RequiredTextField name="firstName" register={register} error={errors.firstName} autoFocus={true} />
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
									<InputLabel
										id="accountRoleLabel"
										style={{ marginLeft: errors.accountRole ? '1rem' : '0rem' }}
										error={!!errors.accountRole}
									>
										Type
									</InputLabel>

									<Controller
										as={
											<Select
												error={!!errors.accountRole}
												variant={errors.accountRole ? 'outlined' : 'standard'}
												label="Type"
												id="accountRole"
											>
												<MenuItem value={Role.Student}>Student</MenuItem>
												<MenuItem value={Role.Instructor}>Instructor</MenuItem>
											</Select>
										}
										name="accountRole"
										rules={{ required: 'This field is required' }}
										control={control}
										defaultValue=""
									/>

									<FormHelperText
										style={{ marginLeft: errors.accountRole ? '1rem' : '0rem' }}
										error={!!errors.accountRole}
									>
										{errors.accountRole ? errors.accountRole.message : 'Select the type of account you want to create'}
									</FormHelperText>
								</FormControl>
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
		</Parallax>
	);
};
