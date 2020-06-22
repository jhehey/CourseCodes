import { userConstants } from '../constants';

// TODO: INITIAL STATE, GET FROM LOCALSTORAGE
const initialState = {};

export const authentication = (state = initialState, action) => {
	switch (action.type) {
		case userConstants.SIGNIN_REQUEST:
			return {
				loggingIn: true,
				email: action.email,
			};
		case userConstants.SIGNIN_SUCCESS:
			return {
				loggedIn: true,
				account: action.account,
			};
		case userConstants.SIGNIN_FAILURE:
			return {
				error: action.error,
			};
		case userConstants.LOGOUT:
			return {};
		case userConstants.SIGNUP_SUCCESS:
			return {
				signedUp: true,
				account: action.account,
			};
		case userConstants.SIGNUP_FAILURE:
			return {
				error: action.error,
			};
		default:
			return state;
	}
};
