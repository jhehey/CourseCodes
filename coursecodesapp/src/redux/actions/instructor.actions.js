import { instructorConstants } from '../constants';
import { InstructorApi } from '../../api';
import { keys, storage } from '../../storage';

const getInstructorByAccountId = (accountId) => {
	const getInstructorSuccess = (instructor) => {
		return { type: instructorConstants.GET_INSTRUCTORBY_ACCOUNTID, instructor };
	};

	return async (dispatch) => {
		const { data: instructor, success } = await InstructorApi.getInstructorByAccountId(accountId);
		if (success) {
			storage.set(keys.SignedInstructor, instructor);
			dispatch(getInstructorSuccess(instructor));
		} else {
			console.error('There was a problem obtaining signed info');
		}
	};
};

export const instructorActions = {
	getInstructorByAccountId,
};
