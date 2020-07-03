import { accountConstants } from '../constants';
import { keys, storage } from '../../storage';

// Get the authenticated account from storage if there is any
const initialState = storage.get(keys.SignedAccount) || { signedIn: false, signedAccount: null };

export const account = (state = initialState, action) => {
	switch (action.type) {
		case accountConstants.SIGNIN_SUCCESS:
			return {
				signedIn: true,
				signedAccount: action.account,
				signInRedirect: true,
				isStudent: action.isStudent,
				isInstructor: action.isInstructor,
			};
		case accountConstants.SIGNIN_FAILURE:
			return {
				signedAccount: false,
				account: null,
			};
		case accountConstants.SIGNIN_FINISHED:
			return {
				signInRedirect: false,
			};
		case accountConstants.LOGOUT:
			return {
				loggedOut: true,
			};
		case accountConstants.SIGNUP_SUCCESS:
			return {
				signedUp: true,
			};
		case accountConstants.SIGNUP_FAILURE:
			return {
				signedUp: false,
			};
		default:
			return state;
	}
};
