import { types } from './types';

const set = ({ key, type }, obj) => {
	const json = JSON.stringify(obj);
	if (type === types.Local) {
		localStorage.setItem(key, json);
	} else if (type === types.Session) {
		sessionStorage.setItem(key, json);
	} else {
		console.error('SET: Unsupported storage type');
	}
};

const get = ({ key, type }) => {
	let json = null;
	if (type === types.Local) {
		json = localStorage.getItem(key);
	} else if (type === types.Session) {
		json = sessionStorage.getItem(key);
	} else {
		console.error('GET: Unsupported storage type');
	}
	return JSON.parse(json);
};

const remove = ({ key, type }) => {
	if (type === types.Local) {
		localStorage.removeItem(key);
	} else if (type === types.Session) {
		sessionStorage.removeItem(key);
	} else {
		console.error('REMOVE: Unsupported storage type');
	}
};

const clear = () => {
	localStorage.clear();
	sessionStorage.clear();
};

export const storage = {
	set,
	get,
	remove,
	clear,
};
