import { problemConstants } from '../constants';
import { alertActions } from './alert.actions';
import { ProblemApi } from '../../api';

const createProblem = (problemToCreate) => {
	const createProblemSuccess = (problem) => {
		return { type: problemConstants.CREATE_PROBLEM_SUCCESS, problem };
	};

	return async (dispatch) => {
		console.log('CREATE PROBLEM ACTION');
		console.log(problemToCreate);
		let success = true;
		let problem = problemToCreate;

		// const { data: problem, success } = await ProblemApi.createProblem(problemToCreate);
		if (success) {
			dispatch(createProblemSuccess(problem));
			dispatch(alertActions.success({ message: 'You have created a problem' }));
		} else {
			dispatch(alertActions.success({ message: 'There was a problem in creating the problem' }));
		}
	};
};

export const problemActions = {
	createProblem,
};
