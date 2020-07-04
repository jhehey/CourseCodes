import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { problemActions } from '../../redux/actions';
import { Grid, IconButton, Paper, Typography, Tooltip } from '@material-ui/core';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { green } from '@material-ui/core/colors';
import { CodeEditor } from '../codeeditor';
import { solutionActions } from '../../redux/actions';

const testCaseComponents = (problem) => {
	return problem?.testCases.map((testCase, index) => (
		<Grid container item key={testCase.id}>
			<Grid item xs={6}>
				<h2>Sample Input</h2>
				<h4>{testCase.sampleInput}</h4>
			</Grid>
			<Grid item xs={6}>
				<h2>Expected Output</h2>
				<h4>{testCase.expectedOutput}</h4>
			</Grid>
		</Grid>
	));
};

export const SolveProblem = () => {
	const { problemId } = useParams();
	const dispatch = useDispatch();
	const problem = useSelector((state) => state.problem?.problem);
	useEffect(() => {
		if (!problem) {
			dispatch(problemActions.getProblem(problemId));
		}
	}, [dispatch, problemId, problem]);

	// console.log('SOLVE PROBLEM');
	// console.log(problem);

	// source code state
	// const [sourceCode, setSourceCode] = useState('');
	// const handleCodeChanged = (value) => {
	// 	setSourceCode(value);
	// 	console.log(sourceCode);
	// };

	// run
	const [sourceCode, setSourceCode] = useState('');
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const handleRun = () => {
		console.log('RUN');
		const solutionToRun = {
			sourceCode,
			problemId,
			studentId: signedAccount.id,
		};
		console.log(solutionToRun);
		dispatch(solutionActions.runSolution(solutionToRun));
	};

	const runResult = useSelector((state) => state.solution?.runResult);
	console.log('RUN RESULT');
	console.log(runResult);

	return (
		<Grid container spacing={1} style={{ height: '90vh' }}>
			<Grid container item xs={5} spacing={0}>
				<Grid container item xs={1}>
					<Paper variant="outlined" style={{ width: '100%' }}>
						<h1>tite</h1>
					</Paper>
				</Grid>
				<Grid container item xs={11}>
					<Paper variant="outlined" style={{ width: '100%', padding: '1em' }}>
						<Typography variant="h4">{problem?.title}</Typography>
						<Typography variant="body1">{problem?.statement}</Typography>
						<Typography variant="h6">Test Cases</Typography>
						{testCaseComponents(problem)}
					</Paper>
				</Grid>
			</Grid>
			<Grid container item xs={7} spacing={1}>
				<Grid container direction="column">
					<Grid item>
						<Paper variant="outlined">
							<Tooltip title="Run" aria-label="run">
								<IconButton onClick={handleRun}>
									<PlayArrowRoundedIcon style={{ color: green['A700'] }} />
								</IconButton>
							</Tooltip>
						</Paper>
					</Grid>
					<Grid item>
						<Paper variant="outlined" style={{ height: '90vh' }}>
							<CodeEditor onChange={(value) => setSourceCode(value)} onMount={(value) => setSourceCode(value)} />
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
