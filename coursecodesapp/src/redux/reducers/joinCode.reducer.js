import { joinCodeConstants } from '../constants';

export const joinCode = (state = null, action) => {
	switch (action.type) {
		case joinCodeConstants.GET_JOINCODE_SUCCESS:
			return {
				code: action.code,
			};
		case joinCodeConstants.GENERATE_JOINCODE_SUCCESS:
			return {
				code: action.code,
			};
		default:
			return state;
	}
};
