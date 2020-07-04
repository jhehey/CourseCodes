import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { course } from './course.reducer';
import { problem } from './problem.reducer';
import { account } from './account.reducer';
import { joinCode } from './joinCode.reducer';
import { solution } from './solution.reducer';

const rootReducer = combineReducers({
	alert,
	course,
	problem,
	account,
	joinCode,
	solution,
});

export default rootReducer;
