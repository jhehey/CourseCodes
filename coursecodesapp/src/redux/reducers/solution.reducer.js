import { solutionConstants } from '../constants';

export const solution = (state = null, action) => {
	switch (action.type) {
		case solutionConstants.RUN_SOLUTION_REQUEST:
			return {
				isTesting: action.isTesting,
			};
		case solutionConstants.RUN_SOLUTION_SUCCESS:
			return {
				runResult: action.runResult,
			};
		case solutionConstants.SOLUTION_SOURCECODE_CHANGED:
			return {
				sourceCode: action.sourceCode,
			};
		default:
			return state;
	}
};
