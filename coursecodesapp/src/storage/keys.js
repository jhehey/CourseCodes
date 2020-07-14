import { types } from './types';

export const keys = {
	SignedAccount: () => {
		return {
			key: 'SIGNED_ACCOUNT',
			type: types.Local,
		};
	},
	SavedSolution: () => {
		return {
			key: `SAVED_SOLUTION`,
			type: types.Local,
		};
	},
	SavedSolutions: (problemId, studentId) => {
		return {
			key: `SAVED_SOLUTIONS-${problemId}-${studentId}`,
			type: types.Local,
		};
	},
	CourseToView: () => {
		return {
			key: 'COURSE_TO_VIEW',
			type: types.Session,
		};
	},
	AssignmentSolutions: () => {
		return {
			key: 'ASSIGNMENT_SOLUTIONS',
			type: types.Session,
		};
	},
};
