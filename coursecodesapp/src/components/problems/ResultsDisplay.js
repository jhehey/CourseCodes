import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { TestCaseContainer } from './TestCase';
import { TestCaseStatus } from '../../helpers';
import { keys, storage } from '../../storage';
import { useParams } from 'react-router-dom';

export const ResultsDisplay = () => {
	const { problemId } = useParams();
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const studentId = signedAccount?.id;
	const isTesting = useSelector((state) => state.solution?.isTesting);

	const runResult =
		useSelector((state) => state.solution?.runResult) || storage.get(keys.SavedResults(studentId, problemId));
	const testCaseResults = runResult?.testCaseResults;

	if (runResult) {
		storage.set(keys.SavedResults(studentId, problemId), runResult);
	}
	console.log(runResult);

	const totalTests = testCaseResults?.length;
	const testPassedCount = testCaseResults?.filter((testCase) => testCase.status === TestCaseStatus.Passed).length;

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
					Status: {!isTesting && testCaseResults && `Passed ${testPassedCount} out of ${totalTests} Test Cases`}
				</Typography>
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
