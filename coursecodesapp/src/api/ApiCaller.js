export default class ApiCaller {
	static async call(request) {
		let result = { data: null, status: null, error: null };
		try {
			const { data, status } = await request();
			result = { ...result, data, status };
		} catch (error) {
			if (error.response) {
				/*
				 * The request was made and the server responded with a
				 * status code that falls out of the range of 2xx
				 */
				result.status = error.response.status;
			}

			result.error = error;
		}
		return result;
	}
}
