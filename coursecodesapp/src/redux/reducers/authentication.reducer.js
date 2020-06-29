import { userConstants } from '../constants';
import { keys, storage } from '../../storage';

// Get the authenticated account from storage if there is any
const initialState = storage.get(keys.Authentication) || { signedIn: false, account: null };

export const authentication = (state = initialState, action) => {
	switch (action.type) {
		case userConstants.SIGNIN_SUCCESS:
			return {
				signedIn: true,
				account: action.account,
				signInRedirect: true,
			};
		case userConstants.SIGNIN_FAILURE:
			return {
				signedIn: false,
				account: null,
			};
		case userConstants.SIGNIN_FINISHED:
			return {
				signInRedirect: false,
			};
		case userConstants.LOGOUT:
			return {
				signedIn: false,
				account: null,
				loggedOut: true,
			};
		case userConstants.SIGNUP_SUCCESS:
			return {
				signedUp: true,
			};
		case userConstants.SIGNUP_FAILURE:
			return {
				signedUp: false,
			};
		default:
			return state;
	}
};
