import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { instructor } from './instructor.reducer';
import { course } from './course.reducer';

const rootReducer = combineReducers({
	alert,
	authentication,
	instructor,
	course,
});

export default rootReducer;
