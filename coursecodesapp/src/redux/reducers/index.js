import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { instructor } from './instructor.reducer';
import { course } from './course.reducer';
import { problem } from './problem.reducer';

const rootReducer = combineReducers({
	alert,
	authentication,
	instructor,
	course,
	problem,
});

export default rootReducer;
