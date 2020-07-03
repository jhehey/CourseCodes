import { ApiHelpers } from '../ApiHelpers';

export class AccountSignInRequest {
	constructor({ email, password }) {
		this.email = email;
		this.passwordHash = ApiHelpers.toHash(password);
	}
}
