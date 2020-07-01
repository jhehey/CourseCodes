import { problemConstants } from '../constants';

export const problem = (state = null, action) => {
	switch (action.type) {
		case problemConstants.CREATE_PROBLEM_SUCCESS:
			return {
				problemCreated: action.problem,
			};
		default:
			return state;
	}
};
