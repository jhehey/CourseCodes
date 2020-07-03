import { problemConstants } from '../constants';

export const problem = (state = null, action) => {
	switch (action.type) {
		case problemConstants.CREATE_PROBLEM_SUCCESS:
			return {
				problemCreated: action.problem,
			};
		case problemConstants.GET_PROBLEMS_SUCCESS:
			return {
				problems: action.problems,
			};
		case problemConstants.GET_PROBLEMSBYID_SUCCESS:
			return {
				problem: action.problem,
			};
		default:
			return state;
	}
};
