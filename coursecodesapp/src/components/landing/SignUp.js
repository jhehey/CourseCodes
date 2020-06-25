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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@material-ui/core';

import { useForm, Controller } from 'react-hook-form';

import EmailTextField from '../common/EmailTextField';
import RequiredTextField from '../common/RequiredTextField';
import useStyles from "./style";
import { Parallax } from 'react-parallax';

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
		<Parallax filter strength={500} bgImage={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'} className={classes.hero2}>
		<Container component="main" maxWidth="xs" border={4}>
			<CssBaseline />
			<div className={classes.paper} >
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
							<Link href="/signin" variant="body2" color='secondary'>
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
		</Parallax>
	);
};

export default SignUp;
