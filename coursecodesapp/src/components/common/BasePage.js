import React, { useEffect } from 'react';
import { pageRoutes } from '../../helpers';

import { Route, Switch, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core/';
import { NotFoundPage, Navbar } from '.';
import { useSelector } from 'react-redux';
import { userActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { instructorActions } from '../../redux/actions';

const getRouteComponents = (routes) => {
	return routes.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />);
};

const BasePage = ({ routes }) => {
	const { signedIn, signInRedirect } = useSelector((state) => state.authentication);

	if (signInRedirect) {
		userActions.signInFinish();
	}

	return (
		<>
			<Navbar routes={routes} signedIn={signedIn} />
			<Box mt={12} mb={5} ml={5} mr={5}>
				<Switch>
					{getRouteComponents(routes)}
					<Route path="*" component={NotFoundPage} />
				</Switch>
			</Box>
			{signInRedirect && <Redirect to="/" />}
		</>
	);
};

export const LandingPage = () => {
	return <BasePage routes={pageRoutes.landing} />;
};

export const StudentPage = () => {
	return <BasePage routes={pageRoutes.student} />;
};

export const InstructorPage = () => {
	// get info of instructor that signed in
	const { account } = useSelector((state) => state.authentication);
	const signedInstructor = useSelector((state) => state.instructor?.signedInstructor);

	const dispatch = useDispatch();
	useEffect(() => {
		if (!signedInstructor) {
			dispatch(instructorActions.getInstructorByAccountId(account.id));
			console.log('Instructor Page');
		}
	}, [dispatch, account, signedInstructor]);

	return <BasePage routes={pageRoutes.instructor} />;
};
