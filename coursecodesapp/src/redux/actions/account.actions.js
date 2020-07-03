import { accountConstants } from '../constants';
import { alertActions } from './alert.actions';
import { AccountsApi } from '../../api';
import { keys, storage } from '../../storage/';

const saveSignedAccount = (signedAccount) => {
	storage.set(keys.SignedAccount, { signedIn: true, signedAccount });
};

const removeSignedAccount = () => {
	storage.remove(keys.SignedAccount);
};

const signIn = (signInDetails) => {
	const signInSuccess = (account) => {
		return { type: accountConstants.SIGNIN_SUCCESS, account };
	};
	const signInFailure = () => {
		return { type: accountConstants.SIGNIN_FAILURE };
	};

	return async (dispatch) => {
		dispatch(alertActions.info({ message: 'Signing In...' }));
		const { data, success, error } = await AccountsApi.signIn(signInDetails);

		setTimeout(() => {
			if (success) {
				// Update storage
				saveSignedAccount(data);
				dispatch(signInSuccess(data));
				dispatch(alertActions.success({ message: 'You are signed in' }));
			} else {
				// Update storage
				removeSignedAccount();
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
		return { type: accountConstants.SIGNUP_SUCCESS };
	};
	const signUpFailure = () => {
		return { type: accountConstants.SIGNIN_FAILURE };
	};

	return async (dispatch) => {
		const { success, error } = await AccountsApi.createAccount(signUpDetails);
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
		return { type: accountConstants.LOGOUT };
	};

	return (dispatch) => {
		// remove saved account info in storage
		removeSignedAccount();

		// dispatch
		dispatch(logoutSuccess());
		dispatch(alertActions.error({ message: 'You have logged out' }));
	};
};

const signInFinish = () => {
	return (dispatch) => {
		dispatch({ type: accountConstants.SIGNIN_FINISHED });
	};
};

export const accountActions = {
	signIn,
	signUp,
	logOut,
	signInFinish,
};
