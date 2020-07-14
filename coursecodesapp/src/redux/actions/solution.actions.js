import { solutionConstants } from '../constants';
import { alertActions } from './alert.actions';
import { SolutionsApi } from '../../api';
import { keys, storage } from '../../storage';

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

const handleCodeEditorChanged = (sourceCode, studentId, problemId) => {
	return async (dispatch) => {
		storage.set(keys.SavedSolutions(problemId, studentId), { sourceCode });
		dispatch({ type: solutionConstants.CODEEDITOR_ONCHANGE, sourceCode });
	};
};

const getCurrentSolution = (query) => {
	return async (dispatch) => {
		const { data: currentSolution, success } = await SolutionsApi.getSolutions(query);
		if (success) {
			dispatch({ type: solutionConstants.GET_CURRENT_SOLUTION, currentSolution });
		} else {
			console.error('There was a problem getting the current solution');
		}
	};
};

const getInitialSourceCode = (studentId, problemId) => {
	const defaultSourceCode = `\
#include <iostream>

int main() {
	std::cout << "Hello World" << std::endl;
}
`;

	const sourceCode = storage.get(keys.SavedSolutions(problemId, studentId))?.sourceCode || defaultSourceCode;
	return handleCodeEditorChanged(sourceCode, studentId, problemId);
};

export const solutionActions = {
	runSolution,
	getSolution,
	getSolutions,
	submitSolution,
	handleCodeEditorChanged,
	getInitialSourceCode,
	getCurrentSolution,
};
