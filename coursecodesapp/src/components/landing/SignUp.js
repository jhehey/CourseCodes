import React from 'react';
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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@material-ui/core';

import { useForm, Controller } from 'react-hook-form';

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = () => {
	const classes = useStyles();

	// React Hook Form
	const { register, handleSubmit, control, errors } = useForm({
		mode: 'onChange',
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
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
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
							<RequiredTextField
								name="password"
								register={register}
								error={errors.password}
								type="password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel
									id="accountTypeLabel"
									style={{ marginLeft: errors.accountType ? '1rem' : '0rem' }}
									error={!!errors.accountType}
								>
									Type
								</InputLabel>

								<Controller
									as={
										<Select
											error={!!errors.accountType}
											variant={errors.accountType ? 'outlined' : 'standard'}
											label="Type"
											id="accountType"
										>
											<MenuItem value={'student'}>Student</MenuItem>
											<MenuItem value={'instructor'}>Instructor</MenuItem>
										</Select>
									}
									name="accountType"
									rules={{ required: 'This field is required' }}
									control={control}
									defaultValue=""
								/>

								<FormHelperText
									style={{ marginLeft: errors.accountType ? '1rem' : '0rem' }}
									error={!!errors.accountType}
								>
									{errors.accountType
										? errors.accountType.message
										: 'Select the type of account you want to create'}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
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
				<Copyright />
			</Box>
		</Container>
	);
};

export default SignUp;
