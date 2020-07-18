import React from 'react';
import { Container, Button, Grid, Typography, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { toDateString } from '../../helpers';

export const UserProfile = () => {
	const signedAccount = useSelector((state) => state.account?.signedAccount);

	return (
		<React.Fragment>
			<Container maxWidth="md">
				<Typography variant="h4" style={{ color: '#37474f', padding: '5px', margin: '5px' }}>
					Profile
				</Typography>
				<Divider variant="fullWidth" style={{ padding: '7px', margin: '7px' }} />
				<Grid container spacing={5}>
					<Grid container item xs={12} direction="column" spacing={2}>
						<Grid item>
							<Typography variant="h6">User Information</Typography>
						</Grid>
						<Grid item>
							<Typography variant="caption">Name</Typography>
							<Typography variant="h5">{signedAccount?.fullName}</Typography>
						</Grid>
						<Grid item>
							<Typography variant="caption">Email Address</Typography>
							<Typography variant="h5">{signedAccount?.email}</Typography>
						</Grid>
						<Grid item>
							<Typography variant="caption">Date of Registration</Typography>
							<Typography variant="h5">{toDateString(signedAccount?.dateRegistered)}</Typography>{' '}
						</Grid>
						<Grid item>
							<Typography variant="caption">Type of Account</Typography>
							<Typography variant="h5">{['Student', 'Instructor'][signedAccount?.accountRole - 1]}</Typography>{' '}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
};
