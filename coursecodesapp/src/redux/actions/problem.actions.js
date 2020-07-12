import { problemConstants } from '../constants';
import { alertActions } from './alert.actions';
import { ProblemsApi } from '../../api';

const createProblem = (problemToCreate) => {
	const createProblemSuccess = (problem) => {
		return { type: problemConstants.CREATE_PROBLEM_SUCCESS, problem };
	};

	return async (dispatch) => {
		const { data: problem, success } = await ProblemsApi.createProblem(problemToCreate);
		if (success) {
			dispatch(createProblemSuccess(problem));
			dispatch(alertActions.success({ message: 'You have created a problem' }));
		} else {
			dispatch(alertActions.error({ message: 'There was an error in processing your request' }));
		}
	};
};

const getProblem = (problemId, query) => {
	const getProblemSuccess = (problem) => {
		return { type: problemConstants.GET_PROBLEMSBYID_SUCCESS, problem };
	};

	return async (dispatch) => {
		const { data: problem, success } = await ProblemsApi.getProblem(problemId, query);
		if (success) {
			dispatch(getProblemSuccess(problem));
		} else {
			console.error('There was an error getting the problem');
		}
	};
};

const getProblems = (query = {}) => {
	const getProblemsSucess = (problems) => {
		return { type: problemConstants.GET_PROBLEMS_SUCCESS, problems };
	};

	return async (dispatch) => {
		const { data: problems, success } = await ProblemsApi.getProblems(query);
		if (success) {
			dispatch(getProblemsSucess(problems));
		} else {
			console.error('There was a problem getting the problems');
		}
	};
};

const getProblemSubmitCounts = (problemSubmitRequest) => {
	const getProblemSubmitCountsSuccess = (problemSubmitCounts) => {
		return { type: problemConstants.GET_PROBLEMSUBMITCOUNTS_SUCCESS, problemSubmitCounts };
	};

	return async (dispatch) => {
		const { data: problemSubmitCounts, success } = await ProblemsApi.getProblemSubmitCounts(problemSubmitRequest);
		if (success) {
			dispatch(getProblemSubmitCountsSuccess(problemSubmitCounts));
		} else {
			console.error('There was a problem getting the problems');
		}
	};
};

const setProblemToView = (problem) => {
	return async (dispatch) => {
		dispatch({ type: problemConstants.SET_PROBLEM_TOVIEW, problem });
	};
};

export const problemActions = {
	createProblem,
	getProblem,
	getProblems,
	getProblemSubmitCounts,
	setProblemToView,
};
