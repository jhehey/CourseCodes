import SHA256 from 'crypto-js/sha256';

export default class ApiHelper {
	static toHash(message) {
		return SHA256(message).toString();
	}

	static toAccountForSignInDto({ email, password }) {
		return {
			email,
			passwordHash: this.toHash(password),
		};
	}

	static toAccountForCreationDto({ firstName, lastName, email, password }) {
		return {
			firstName,
			lastName,
			email,
			passwordHash: this.toHash(password),
		};
	}
}
