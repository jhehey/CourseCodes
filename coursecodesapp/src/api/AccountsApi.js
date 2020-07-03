import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';
import * as Models from './models';

const signIn = async (signInDetails) => {
	const accountToSignIn = new Models.AccountSignInRequest(signInDetails);
	return await Api.call(async () => await axios.post(Routes.Authenticate(), accountToSignIn));
};

const createAccount = async (account) => {
	const accountToCreate = new Models.AccountCreateRequest(account);
	return await Api.call(async () => await axios.post(Routes.Accounts(), accountToCreate));
};
const getAccount = async (accountId) => {
	return await Api.call(async () => await axios.get(Routes.Accounts(accountId)));
};

export const AccountsApi = {
	signIn,
	createAccount,
	getAccount,
};
