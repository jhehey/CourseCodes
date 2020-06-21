import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

// material
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
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

// api
import { AccountsApi } from '../../api';
import HttpStatusCodes from 'http-status-codes';

// common
import EmailTextField from '../common/EmailTextField';
import RequiredTextField from '../common/RequiredTextField';
import SnackAlert from '../common/SnackAlert';
import Copyright from '../common/CopyRight';

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

	const [signInError, setSignInError] = useState(false);

	const history = useHistory();
	const handleLogin = () => {
		history.replace('/about');
	};

	// React Hook Form
	const { register, handleSubmit, errors } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	// TODO: send request to server
	const onSubmit = (signInDetails) => {
		(async () => {
			const { data: account, status } = await AccountsApi.signIn(signInDetails);

			// TODO: Add account to state?
			if (status === HttpStatusCodes.OK && account) {
				console.log({ msg: 'Account Found', account });
				handleLogin();
			} else if (status === HttpStatusCodes.NOT_FOUND) {
				setSignInError(true);
			}
		})();
	};

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

			<SnackAlert
				open={signInError}
				setOpen={setSignInError}
				severity="error"
				message="Invalid Username/Password"
			/>
		</Container>
	);
};

export default SignIn;
