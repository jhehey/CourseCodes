import { solutionConstants } from '../constants';
import { storage, keys } from '../../storage';

const initialState = { solutions: storage.get(keys.AssignmentSolutions()) || null };

export const solution = (state = initialState, action) => {
	switch (action.type) {
		case solutionConstants.RUN_SOLUTION_REQUEST:
			return {
				...state,
				isTesting: action.isTesting,
			};
		case solutionConstants.RUN_SOLUTION_SUCCESS:
			return {
				...state,
				isTesting: false,
				runResult: action.runResult,
			};
		case solutionConstants.SOLUTION_SOURCECODE_CHANGED:
			return {
				...state,
				sourceCode: action.sourceCode,
			};
		case solutionConstants.GET_SOLUTIONBYID_SUCCESS:
			return {
				...state,
				solution: action.solution,
			};
		case solutionConstants.GET_SOLUTIONS_SUCCESS:
			return {
				...state,
				solutions: action.solutions,
			};
		case solutionConstants.SUBMIT_SOLUTION_SUCCESS:
			return {
				...state,
				solution: action.solution,
			};
		default:
			return state;
	}
};
