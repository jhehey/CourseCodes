import { instructorConstants } from '../constants';
import { keys, storage } from '../../storage';

const initialState = { signedInstructor: storage.get(keys.SignedInstructor) || null };

export const instructor = (state = initialState, action) => {
	switch (action.type) {
		case instructorConstants.GET_INSTRUCTORBY_ACCOUNTID:
			return {
				signedInstructor: action.instructor,
			};
		default:
			return state;
	}
};
