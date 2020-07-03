import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { course } from './course.reducer';
import { problem } from './problem.reducer';
import { account } from './account.reducer';

const rootReducer = combineReducers({
	alert,
	course,
	problem,
	account,
});

export default rootReducer;
