import { alertConstants } from '../constants';

// prevState = { initialState }, action -> return newState
export const alert = (state = { vertical: 'bottom', horizontal: 'center' }, action) => {
	switch (action.type) {
		case alertConstants.SUCCESS:
			return {
				open: true,
				severity: 'success',
				message: action.message,
				vertical: action.vertical,
				horizontal: action.horizontal,
			};
		case alertConstants.ERROR:
			return {
				open: true,
				severity: 'error',
				message: action.message,
				vertical: action.vertical,
				horizontal: action.horizontal,
			};
		case alertConstants.INFO:
			return {
				open: true,
				severity: 'info',
				message: action.message,
				vertical: action.vertical,
				horizontal: action.horizontal,
			};
		case alertConstants.CLEAR:
			return { ...state, open: false };
		default:
			return state;
	}
};
