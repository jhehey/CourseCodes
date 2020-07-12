import { solutionConstants } from '../constants';
import { alertActions } from './alert.actions';
import { SolutionsApi } from '../../api';

const runSolution = (solutionToRun) => {
	const runSolutionRequest = () => {
		return { type: solutionConstants.RUN_SOLUTION_REQUEST, isTesting: true };
	};
	const runSolutionSuccess = (runResult) => {
		return { type: solutionConstants.RUN_SOLUTION_SUCCESS, runResult };
	};

	return async (dispatch) => {
		dispatch(runSolutionRequest());

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

const getSolution = (solutionId) => {
	const getSolutionSuccess = (solution) => {
		return { type: solutionConstants.GET_SOLUTIONBYID_SUCCESS, solution };
	};

	return async (dispatch) => {
		const { data: solution, success } = await SolutionsApi.getSolution(solutionId);
		if (success) {
			dispatch(getSolutionSuccess(solution));
		} else {
			console.error('There was a problem getting the solution');
		}
	};
};

const getSolutions = (query = {}) => {
	const getSolutionsSuccess = (solutions) => {
		return { type: solutionConstants.GET_SOLUTIONS_SUCCESS, solutions };
	};

	return async (dispatch) => {
		const { data: solutions, success } = await SolutionsApi.getSolutions(query);
		if (success) {
			dispatch(getSolutionsSuccess(solutions));
		} else {
			console.error('There was a problem getting the solutions');
		}
	};
};

const submitSolution = (solutionId) => {
	const submitSolutionSuccess = (solution) => {
		return { type: solutionConstants.SUBMIT_SOLUTION_SUCCESS, solution };
	};
	return async (dispatch) => {
		const { data: solution, success } = await SolutionsApi.submitSolution(solutionId);
		if (success) {
			dispatch(alertActions.success({ message: 'Your solution has been submitted' }));
			dispatch(submitSolutionSuccess(solution));
		} else {
			console.error('There was a problem submitting the solution');
		}
	};
};

export const solutionActions = {
	runSolution,
	updateSourceCode,
	getSolution,
	getSolutions,
	submitSolution,
};
