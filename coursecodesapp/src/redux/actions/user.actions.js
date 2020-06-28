import { userConstants } from '../constants';
import { alertActions } from './alert.actions';
import { AccountApi } from '../../api';
import { keys, storage } from '../../storage/';

const setAuthentication = (account) => {
	storage.set(keys.Authentication, { signedIn: true, account });
};

const removeAuthentication = () => {
	storage.remove(keys.Authentication);
};

const signIn = (signInDetails) => {
	const signInSuccess = (account) => {
		return { type: userConstants.SIGNIN_SUCCESS, account };
	};

	const signInFailure = () => {
		return { type: userConstants.SIGNIN_FAILURE };
	};

	return async (dispatch) => {
		dispatch(alertActions.info({ message: 'Signing In...' }));
		const { data, success, error } = await AccountApi.signIn(signInDetails);

		setTimeout(() => {
			// TODO: Yung status palitan ng success lng. sa Api ihandle ung success
			if (success) {
				// save the authentication info in storage
				setAuthentication(data);

				// dispatch
				dispatch(signInSuccess(data));
				dispatch(alertActions.success({ message: 'You are signed in' }));
			} else {
				// failed, so remove any info in storage
				removeAuthentication();

				// dispatch
				dispatch(signInFailure());
				if (error && error.message === 'Network Error') {
					dispatch(alertActions.error({ message: 'There was a problem connecting to the server' }));
				} else {
					dispatch(alertActions.error({ message: 'Invalid email/password' }));
				}
			}
		}, 600);
	};
};

const signUp = (signUpDetails) => {
	const signUpSuccess = () => {
		return { type: userConstants.SIGNUP_SUCCESS };
	};

	const signUpFailure = () => {
		return { type: userConstants.SIGNIN_FAILURE };
	};

	return async (dispatch) => {
		const { success, error } = await AccountApi.signUp(signUpDetails);
		if (success) {
			dispatch(signUpSuccess());
			dispatch(alertActions.success({ message: 'Successfully signed up' }));
		} else {
			const message = (error && error.Email && error.Email[0]) || 'There was an error processing your request';
			dispatch(signUpFailure());
			dispatch(alertActions.error({ message }));
		}
	};
};

const logOut = () => {
	const logoutSuccess = () => {
		return { type: userConstants.LOGOUT };
	};

	return (dispatch) => {
		// remove saved account info in storage
		removeAuthentication();

		// dispatch
		dispatch(logoutSuccess());
		dispatch(alertActions.error({ message: 'You have logged out' }));
	};
};

const signInFinish = () => {
	return (dispatch) => {
		dispatch({ type: userConstants.SIGNIN_FINISHED });
	};
};

export const userActions = {
	signIn,
	signUp,
	logOut,
	signInFinish,
};
