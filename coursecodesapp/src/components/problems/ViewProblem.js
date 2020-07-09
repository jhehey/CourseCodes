import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { Role } from '../../helpers';
import { ProblemDisplay } from './';

export const ViewProblem = () => {
	const location = useLocation().pathname;
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;

	return (
		<Grid container>
			{isInstructor && (
				<Grid item xs={2}>
					<Grid item xs={12}>
						<Button href="#" variant="contained" color="primary">
							edit?
						</Button>
					</Grid>
				</Grid>
			)}
			{isStudent && (
				<Grid item xs={3}>
					<Grid item xs={12}>
						<Button href={`${location}/solve`} variant="contained" color="primary">
							Solve
						</Button>
					</Grid>
				</Grid>
			)}
			<Grid container item xs={8} spacing={2} direction="column">
				<ProblemDisplay />
			</Grid>
		</Grid>
	);
};
