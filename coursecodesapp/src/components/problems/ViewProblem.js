import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { problemActions } from '../../redux/actions';
import { Grid, Button } from '@material-ui/core';

export const ViewProblem = () => {
	// dispatch request to get problem info
	const { problemId } = useParams();
	const dispatch = useDispatch();
	const problem = useSelector((state) => state.problem?.problem);

	useEffect(() => {
		if (!problem) {
			dispatch(problemActions.getProblem(problemId));
		}
	}, [dispatch, problemId, problem]);

	console.log('VIEW PROBLEM');
	console.log(problem);

	const testCases = problem?.testCases.map((testCase, index) => (
		<Grid container item key={testCase.id}>
			<Grid container item>
				<Grid item xs={3}>
					<h2>Test Case {index + 1}</h2>
				</Grid>
				<Grid item xs={4}>
					<h2>Sample Input</h2>
					<h4>{testCase.sampleInput}</h4>
				</Grid>
				<Grid item xs={4}>
					<h2>Expected Output</h2>
					<h4>{testCase.expectedOutput}</h4>
				</Grid>
			</Grid>
		</Grid>
	));

	return (
		<Grid container>
			<Grid item xs={3}>
				<Grid item xs={12}>
					<Button href="#" variant="contained" color="primary">
						View Who answered this problem?
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={9}>
				<h1>View Problem</h1>
				<h1>Title: {problem?.title}</h1>
				<h3>Statement: {problem?.statement}</h3>
				<h1>Test Cases</h1>
				{testCases}
			</Grid>
		</Grid>
	);
};
