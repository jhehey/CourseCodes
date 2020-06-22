import { userConstants } from '../constants';
import { alertActions } from './alert.actions';
import { AccountApi } from '../../api';

const signIn = (signInDetails) => {
	const signInRequest = (email) => {
		return { type: userConstants.SIGNIN_REQUEST, email };
	};

	const signInSuccess = (account) => {
		return { type: userConstants.SIGNIN_SUCCESS, account };
	};

	const signInFailure = (error) => {
		return { type: userConstants.SIGNIN_FAILURE, error };
	};

	return async (dispatch) => {
		dispatch(signInRequest(signInDetails.email));
		dispatch(alertActions.info({ message: 'Signing In...' }));

		const { data: account, success, status, error } = await AccountApi.signIn(signInDetails);

		setTimeout(() => {
			// TODO: Yung status palitan ng success lng. sa Api ihandle ung success
			if (success) {
				// TODO: Save this to localStorage
				dispatch(signInSuccess(account));
				dispatch(alertActions.success({ message: 'Successfully Logged In ' + account.email }));
			} else {
				console.log(status, error.message);
				if (error.message === 'Network Error') {
					dispatch(alertActions.error({ message: 'There was a problem connecting to the server' }));
				} else {
					dispatch(signInFailure({ message: 'Invalid Username/Password' }));
					dispatch(alertActions.error({ message: 'Invalid Username/Password' }));
				}
			}
		}, 500);
	};
};

const signUp = (signUpDetails) => {
	const signUpSuccess = (account) => {
		return { type: userConstants.SIGNUP_SUCCESS, account };
	};

	const signUpFailure = (error) => {
		return { type: userConstants.SIGNUP_FAILURE, error };
	};

	return async (dispatch) => {
		const { data: account, success, error } = await AccountApi.signUp(signUpDetails);
		if (success) {
			dispatch(signUpSuccess(account));
			dispatch(alertActions.success({ message: 'Successfully Signed Up ' + account.email }));
		} else {
			const message = (error && error.Email && error.Email[0]) || 'There was an error processing your request';
			dispatch(signUpFailure(error));
			dispatch(alertActions.error({ message }));
		}
	};
};

export const userActions = {
	signIn,
	signUp,
};
