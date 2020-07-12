import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';
import * as Models from './models';

const createSolution = () => {};
const getSolution = async (solutionId) => {
	console.log(`GET Solution: ${Routes.Solutions({ solutionId })}`);
	return await Api.call(async () => await axios.get(Routes.Solutions({ solutionId })));
};
const getSolutions = async (query = {}) => {
	console.log(`GET Solutions: ${Routes.Solutions({ query })}`);
	return await Api.call(async () => await axios.get(Routes.Solutions({ query })));
};

const runSolution = async (solutionDetails) => {
	const solutionToRun = new Models.SolutionRunRequest(solutionDetails);
	return await Api.call(async () => await axios.post(Routes.Solutions({ run: true }), solutionToRun));
};

const submitSolution = async (solutionId) => {
	return await Api.call(async () => await axios.post(Routes.Solutions(), { solutionId }));
};

export const SolutionsApi = {
	createSolution,
	getSolution,
	getSolutions,
	runSolution,
	submitSolution,
};
