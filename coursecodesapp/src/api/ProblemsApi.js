import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';
import * as Models from './models';

const createProblem = async (problemDetails) => {
	const problemToCreate = new Models.ProblemCreateRequest(problemDetails);
	return await Api.call(async () => await axios.post(Routes.Problems(), problemToCreate));
};
const getProblem = async (problemId) => {
	return await Api.call(async () => await axios.get(Routes.Problems({ problemId })));
};

const getProblems = async (query = {}) => {
	console.log(`GET PROBLEMS: ${Routes.Problems({ query })}`);
	return await Api.call(async () => await axios.get(Routes.Problems({ query })));
};

export const ProblemsApi = {
	createProblem,
	getProblem,
	getProblems,
};
