import axios from 'axios';
import Routes from './Routes';
import { StudentApi, InstructorApi } from '.';
import { ApiHelpers } from './ApiHelpers';
import { Api } from './Api';

const signIn = async (signInDetails) => {
	const accountToSignIn = ApiHelpers.toAccountForSignInDto(signInDetails);
	return await Api.call(async () => await axios.post(Routes.Accounts, accountToSignIn));
};

const signUp = async (signUpDetails) => {
	const accountToCreate = ApiHelpers.toAccountForCreationDto(signUpDetails);

	if (signUpDetails.accountRole === 0) {
		return await StudentApi.createStudent(accountToCreate);
	} else if (signUpDetails.accountRole === 1) {
		return await InstructorApi.createInstructor(accountToCreate);
	} else {
		return { error: new Error('Invalid Account Role Selected') };
	}
};

export const AccountApi = {
	signIn,
	signUp,
};
