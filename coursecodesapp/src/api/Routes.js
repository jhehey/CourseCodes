const baseUrl = `${process.env.REACT_APP_API}`;

const toQueryString = (query) =>
	Object.keys(query)
		.map((key) => `${key}=${query[key]}`)
		.join('&');

// TODO: lagay ng routes lagyan ng query
// TODO: helper function to create query string
const Routes = {
	Accounts: ({ accountId = null } = {}) => {
		const url = `${baseUrl}/accounts`;

		if (accountId) {
			return `${url}/${accountId}`;
		}
		return url;
	},
	Authenticate: (params = {}) => `${baseUrl}/accounts/authenticate`,
	Students: ({ query = null } = {}) => {
		const url = `${baseUrl}/students`;

		if (query) {
			return `${url}/?${toQueryString(query)}`;
		}

		return url;
	},
	Courses: ({ courseId = null, query = null, join = false } = {}) => {
		const url = `${baseUrl}/courses`;

		if (join) {
			return `${url}/join`;
		}

		if (courseId) {
			return `${url}/${courseId}`;
		}

		if (query) {
			return `${url}/?${toQueryString(query)}`;
		}

		return url;
	},
	JoinCodes: (courseId, params = { generate: false }) => {
		const url = `${baseUrl}/courses/${courseId}/joincodes`;

		if (params.generate) {
			return `${url}/generate`;
		}

		return url;
	},
	Problems: ({ problemId = null, query = null, params = null } = {}) => {
		const url = `${baseUrl}/problems`;

		if (problemId && query) {
			return `${url}/${problemId}/?${toQueryString(query)}`;
		}

		if (problemId) {
			return `${url}/${problemId}`;
		}

		if (query) {
			return `${url}/?${toQueryString(query)}`;
		}

		if (params) {
			return `${url}/${params}`;
		}

		return url;
	},
	Solutions: ({ solutionId = null, run = false, query = null } = {}) => {
		const url = `${baseUrl}/solutions`;

		if (run) {
			return `${url}/run`;
		}

		if (solutionId) {
			return `${url}/${solutionId}`;
		}

		if (query) {
			return `${url}/?${toQueryString(query)}`;
		}

		return url;
	},
	Topics: (courseId, { topicId = null } = {}) => {
		const url = `${baseUrl}/courses/${courseId}`;

		if (topicId) {
			return `${url}/${topicId}`;
		}
		return url;
	},
};

export default Routes;
