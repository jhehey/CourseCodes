import { problemConstants } from '../constants';

export const problem = (state = null, action) => {
	switch (action.type) {
		case problemConstants.CREATE_PROBLEM_SUCCESS:
			return {
				...state,
				problemCreated: action.problem,
			};
		case problemConstants.GET_PROBLEMS_SUCCESS:
			return {
				...state,
				problems: action.problems,
			};
		case problemConstants.GET_PROBLEMSBYID_SUCCESS:
			return {
				...state,
				problem: action.problem,
			};
		case problemConstants.GET_PROBLEMSUBMITCOUNTS_SUCCESS:
			return {
				...state,
				problemSubmitCounts: action.problemSubmitCounts,
			};
		case problemConstants.SET_PROBLEM_TOVIEW:
			return {
				...state,
				problem: action.problem,
			};
		default:
			return state;
	}
};
