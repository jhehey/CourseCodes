import { ApiHelpers } from './ApiHelpers';

// TODO: when there is network error. dispatch alert with network error or something

const call = async (request) => {
	let result = { data: null, status: null, error: null };
	try {
		const { data, status } = await request();
		result = { ...result, data, success: ApiHelpers.isStatusSuccess(status) };
	} catch (error) {
		if (error.response) {
			/*
			 * The request was made and the server responded with a
			 * status code that falls out of the range of 2xx
			 */
			result.status = error.response.status;
			result.error = error.response.data.errors;
			console.log(result.error);

			if(result.status == 504) {
				result.error = { message: "Gateway Timed Out"}
			}
		} else {
			result.error = error;
		}
	}
	return result;
};

export const Api = {
	call,
};
