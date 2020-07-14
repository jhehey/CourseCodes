import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Button, Typography } from '@material-ui/core';
import { Role } from '../../helpers';
import { ProblemDisplay } from './';

const StudentViewProblem = () => {
	const { problemId } = useParams();
	const location = useLocation().pathname;

	const solutions = useSelector((state) => state.solution?.solutions);
	const solutionsById = solutions?.filter((s) => s.problem.id === problemId);
	const solution = solutionsById?.length > 0 && solutionsById[0];
	const submitted = solution?.status === 1;

	const courseId = useSelector((state) => state.course?.courseToView?.id);

	return (
		<Grid container>
			<Grid item xs={3}>
				<Grid item xs={12}>
					{(submitted && (
						<>
							<Typography>You have already submitted a solution for this problem</Typography>
							<Button href={`/courses/${courseId}/solutions/${solution?.id}`} variant="contained" color="primary">
								View Solution
							</Button>
						</>
					)) || (
						<Button href={`${location}/solve`} variant="contained" color="primary">
							Solve
						</Button>
					)}
				</Grid>
			</Grid>
			<Grid container item xs={8} spacing={2} direction="column">
				<ProblemDisplay />
			</Grid>
		</Grid>
	);
};

const InstructorViewProblem = () => {
	return (
		<Grid container item style={{ margin: '2em' }} spacing={2} direction="column">
			<ProblemDisplay />
		</Grid>
	);
};

export const ViewProblem = () => {
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;

	return (
		(isStudent && <StudentViewProblem />) || (isInstructor && <InstructorViewProblem />) || <div>Invalid Account</div>
	);
};
