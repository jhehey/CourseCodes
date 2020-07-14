import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { problemActions } from '../../redux/actions';
import { Grid, Typography } from '@material-ui/core';
import { TestCaseContainer } from './TestCase';

export const ProblemDisplay = () => {
	// dispatch request to get problem info
	const { problemId } = useParams();
	const dispatch = useDispatch();
	const problem = useSelector((state) => state.problem?.problem);
	const courseToView = useSelector((state) => state.course?.courseToView);

	useEffect(() => {
		if (problem?.id !== problemId) {
			dispatch(problemActions.getProblem(problemId, { courseId: courseToView.id }));
		}
	}, [dispatch, problemId, courseToView, problem]);

	const testCases = problem?.testCases.map((testCase) => {
		const testCaseModel = {
			left: { name: 'sampleInput', value: testCase.sampleInput },
			right: { name: 'expectedOutput', value: testCase.expectedOutput },
		};

		return <TestCaseContainer key={testCase.id} {...testCaseModel} />;
	});

	return (
		<Grid container spacing={2} direction="column">
			<Grid item>
				<Typography variant="h4" style={{ fontWeight: 'bold' }}>
					{problem?.title}
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant="body1"> {problem?.statement}</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h6"> Test Cases</Typography>
				<Grid container item spacing={2}>
					{testCases}
				</Grid>
			</Grid>
		</Grid>
	);
};
