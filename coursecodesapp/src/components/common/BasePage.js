import React from 'react';
import { pageRoutes } from '../../helpers';

import { Route, Switch, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core/';
import { NotFoundPage, Navbar } from '.';
import { useSelector } from 'react-redux';
import { accountActions } from '../../redux/actions';

const getRouteComponents = (routes) => {
	return routes.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />);
};

const BasePage = ({ routes }) => {
	const { signedIn, signInRedirect } = useSelector((state) => state.account);

	if (signInRedirect) {
		accountActions.signInFinish();
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
	return <BasePage routes={pageRoutes.instructor} />;
};
