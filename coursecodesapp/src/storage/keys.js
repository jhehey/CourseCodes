import { types } from './types';

export const keys = {
	SignedAccount: () => {
		return {
			key: 'SIGNED_ACCOUNT',
			type: types.Local,
		};
	},
	SavedSolutions: (problemId, studentId) => {
		return {
			key: `SAVED_SOLUTIONS-${problemId}-${studentId}`,
			type: types.Local,
		};
	},
};
