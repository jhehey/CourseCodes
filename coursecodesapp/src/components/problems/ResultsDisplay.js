import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, TextField } from '@material-ui/core';
import { TestCaseContainer } from './TestCase';
import { TestCaseStatus } from '../../helpers';

export const ResultsDisplay = () => {
	const isTesting = useSelector((state) => state.solution?.isTesting);

	const runResult = useSelector((state) => state.solution?.runResult);
	const testCaseResults = runResult?.testCaseResults;
	const totalTests = testCaseResults?.length;
	const testPassedCount = testCaseResults?.filter((testCase) => testCase.status === TestCaseStatus.Passed).length;

	console.log(runResult);

	const resultsComponent = testCaseResults?.map((result, index) => {
		const resultModel = {
			left: { name: 'expectedOutput', value: result.expectedOutput },
			right: { name: 'actualOutput', value: result.actualOutput },
		};

		const status =
			result.status === TestCaseStatus.Passed
				? 'Passed'
				: result.status === TestCaseStatus.Failed
				? 'Failed'
				: result.status === TestCaseStatus.Error
				? 'Error'
				: 'Undefined';

		return (
			<React.Fragment key={index}>
				<Grid item>
					<Typography>
						Test Case {index + 1}: {status}
					</Typography>
				</Grid>
				<TestCaseContainer {...resultModel} rows={3} />
			</React.Fragment>
		);
	});

	return (
		<Grid container spacing={2} direction="column">
			<Grid container item>
				<Typography>
					Results: {isTesting ? 'Your code is being tested' : testCaseResults ? 'Your results have arrived' : ''}
				</Typography>
			</Grid>
			<Grid container item>
				<Typography>
					Status:{' '}
					{(!isTesting && testCaseResults && `Passed ${testPassedCount} out of ${totalTests} Test Cases`) ||
						(runResult?.compilationError && 'Compilation Error')}
				</Typography>
				{runResult?.compilationError && (
					<>
						<TextField
							name="compilationError"
							value={runResult?.compilationError.replace(
								/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
								''
							)}
							variant="outlined"
							fullWidth
							aria-readonly="true"
							type="text"
							multiline={true}
							rows={12}
							rowsMax={20}
							inputProps={{
								style: {
									fontFamily: 'monospace',
									fontSize: '12px',
									whiteSpace: 'nowrap',
									overflowX: 'scroll',
									wordWrap: '-moz-initial',
								},
							}}
						/>
					</>
				) || 
				runResult?.timedOut && (
					<TextField name="timedOutError" value="Your code timed out"/>
				)}
			</Grid>
			<Grid container item>
				<Typography>Test Cases</Typography>
			</Grid>
			<Grid container item spacing={2}>
				{!isTesting && resultsComponent}
			</Grid>
		</Grid>
	);
};
