import { solutionConstants } from '../constants';
import { alertActions } from './alert.actions';
import { SolutionsApi } from '../../api';

const runSolution = (solutionToRun) => {
	const runSolutionSuccess = (runResult) => {
		return { type: solutionConstants.RUN_SOLUTION_SUCCESS, runResult };
	};

	return async (dispatch) => {
		const { data: runResult, success } = await SolutionsApi.runSolution(solutionToRun);
		if (success) {
			dispatch(runSolutionSuccess(runResult));
		} else {
			dispatch(alertActions.error({ message: 'There was an error in processing your request' }));
		}
	};
};

const updateSourceCode = (sourceCode) => {
	return (dispatch) => {
		console.log('SOURCE CODE');
		console.log(sourceCode);
		dispatch({ type: solutionConstants.SOLUTION_SOURCECODE_CHANGED, sourceCode });
	};
};

export const solutionActions = {
	runSolution,
	updateSourceCode,
};
