import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';
import * as Models from './models';

const createProblem = async (problemDetails) => {
	const problemToCreate = new Models.ProblemCreateRequest(problemDetails);
	return await Api.call(async () => await axios.post(Routes.Problems(), problemToCreate));
};
const getProblem = async (problemId, query = {}) => {
	console.log(`GET PROBLEM: ${Routes.Problems({ problemId, query })}`);
	return await Api.call(async () => await axios.get(Routes.Problems({ problemId, query })));
};

const getProblems = async (query = {}) => {
	console.log(`GET PROBLEMS: ${Routes.Problems({ query })}`);
	return await Api.call(async () => await axios.get(Routes.Problems({ query })));
};

const getProblemSubmitCounts = async (problemSubmitRequest) => {
	return await Api.call(async () => await axios.post(Routes.Problems({ params: 'submitCount' }), problemSubmitRequest));
};

export const ProblemsApi = {
	createProblem,
	getProblem,
	getProblems,
	getProblemSubmitCounts,
};
