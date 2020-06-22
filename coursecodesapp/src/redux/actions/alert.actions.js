import { alertConstants } from '../constants';

const success = ({ message, vertical = 'bottom', horizontal = 'center' }) => {
	return { type: alertConstants.SUCCESS, message, vertical, horizontal };
};

const error = ({ message, vertical = 'bottom', horizontal = 'center' }) => {
	return { type: alertConstants.ERROR, message, vertical, horizontal };
};

const clear = () => {
	return { type: alertConstants.CLEAR };
};

export const alertActions = {
	success,
	error,
	clear,
};
