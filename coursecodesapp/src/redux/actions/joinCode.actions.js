import { joinCodeConstants } from '../constants';
import { alertActions } from './alert.actions';
import { JoinCodesApi } from '../../api';

const generateJoinCode = (courseId) => {
	const generateJoinCodeSuccess = (code) => {
		return { type: joinCodeConstants.GENERATE_JOINCODE_SUCCESS, code };
	};

	return async (dispatch) => {
		const { data: joinCode, success } = await JoinCodesApi.generateJoinCode(courseId);
		if (success) {
			dispatch(generateJoinCodeSuccess(joinCode.code));
		} else {
			dispatch(alertActions.error({ message: 'There was an error in processing your request' }));
		}
	};
};

const getJoinCode = (courseId) => {
	const getJoinCodeSuccess = (code) => {
		return { type: joinCodeConstants.GET_JOINCODE_SUCCESS, code };
	};

	return async (dispatch) => {
		const { data: joinCode, success } = await JoinCodesApi.getJoinCode(courseId);
		if (success) {
			dispatch(getJoinCodeSuccess(joinCode.code));
		} else {
			dispatch(alertActions.error({ message: 'There was an error in processing your request' }));
		}
	};
};

export const joinCodeActions = {
	generateJoinCode,
	getJoinCode,
};
