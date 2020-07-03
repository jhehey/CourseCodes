import { ApiHelpers } from '../ApiHelpers';

export class AccountCreateRequest {
	constructor({ firstName, lastName, email, password, accountRole }) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.passwordHash = ApiHelpers.toHash(password);
		this.accountRole = accountRole;
	}
}
