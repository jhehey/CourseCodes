import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';
import * as Models from './models';

const createSolution = () => {};
const getSolution = (solutionId) => {};
const runSolution = async (solutionDetails) => {
	const solutionToRun = new Models.SolutionRunRequest(solutionDetails);
	return await Api.call(async () => await axios.post(Routes.Solutions({ run: true }), solutionToRun));
};

export const SolutionsApi = {
	createSolution,
	getSolution,
	runSolution,
};
