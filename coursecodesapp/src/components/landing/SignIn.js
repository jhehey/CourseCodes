import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from '@material-ui/core';

import { useForm } from 'react-hook-form';

import EmailTextField from '../common/EmailTextField';
import RequiredTextField from '../common/RequiredTextField';

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

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

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
				<Copyright />
			</Box>
		</Container>
	);
};

export default SignIn;
