import SHA256 from 'crypto-js/sha256';

const toHash = (message) => {
	return SHA256(message).toString();
};

const toAccountForSignInDto = ({ email, password }) => {
	return {
		email,
		passwordHash: toHash(password),
	};
};

const toAccountForCreationDto = ({ firstName, lastName, email, password, accountRole }) => {
	return {
		firstName,
		lastName,
		email,
		passwordHash: toHash(password),
		accountRole,
	};
};

const isStatusSuccess = (status) => {
	return status >= 200 && status < 300;
};

export const ApiHelpers = {
	toHash,
	toAccountForSignInDto,
	toAccountForCreationDto,

	isStatusSuccess,
};
