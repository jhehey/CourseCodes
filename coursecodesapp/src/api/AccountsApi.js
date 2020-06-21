import axios from 'axios';
import Routes from './Routes';
import { StudentsApi, InstructorsApi } from './';
import ApiCaller from './ApiCaller';
import ApiHelper from './ApiHelper';

export default class AccountsApi extends ApiCaller {
	static async signIn(signInDetails) {
		const accountToSignIn = ApiHelper.toAccountForSignInDto(signInDetails);
		return await this.call(async () => await axios.post(Routes.Accounts, accountToSignIn));
	}

	static async signUp(signUpDetails) {
		const accountToCreate = ApiHelper.toAccountForCreationDto(signUpDetails);

		if (signUpDetails.accountRole === 0) {
			return await StudentsApi.createStudent(accountToCreate);
		} else if (signUpDetails.accountRole === 1) {
			return await InstructorsApi.createInstructor(accountToCreate);
		} else {
			return { error: new Error('Invalid Account Role Selected') };
		}
	}
}
