import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Avatar,
	Button,
	CssBaseline,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { Parallax } from 'react-parallax';
import EmailTextField from '../common/EmailTextField';
import RequiredTextField from '../common/RequiredTextField';
import useStyles from "./style";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const SignIn = () => {
	const classes = useStyles();

	// React Hook Form
	const { register, handleSubmit, errors } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	// TODO: send request to server
	const onSubmit = (data) => console.log(data);

	return (
		<Parallax filter strength={500} bgImage={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'} className={classes.hero2}>
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<EmailTextField name="email" register={register} error={errors.email} />
						</Grid>
						<Grid item xs={12}>
							<RequiredTextField
								name="password"
								register={register}
								error={errors.password}
								type="password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Sign In
							</Button>
						</Grid>

						<Grid item xs={12}>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2" color='secondary'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="/signup" variant="body2" color='secondary'>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
		</Parallax>
	);
};

export default SignIn;
