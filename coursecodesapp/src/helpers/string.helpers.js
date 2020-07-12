export const toSentenceCase = (word) => {
	let result = '';
	for (let i = 1; i < word.length; i++) {
		let cur = word[i];
		if (cur === cur.toUpperCase()) {
			result += ' ' + cur;
		} else {
			result += cur;
		}
	}

	result = word.charAt(0).toUpperCase() + result;
	return result;
};

export const toDateString = (rawDate) => {
	return new Date(rawDate).toDateString('').slice(4);
};

export const stringHelpers = {
	toSentenceCase,
	toDateString,
};
