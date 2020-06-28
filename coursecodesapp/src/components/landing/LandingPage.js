import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core/';
import { Navbar, SignIn, SignUp, About, Home } from '.';
import { NotFoundPage } from '../common';

const getRouteComponents = (routes) => {
	return routes.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />);
};

export const LandingPage = () => {
	const routes = [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/signin', component: SignIn },
		{ path: '/signup', component: SignUp },
	];

	return (
		<>
			<Navbar />
			<Box mt={15} mb={5}>
				<Switch>
					{getRouteComponents(routes)}
					<Route path="*" component={NotFoundPage} />
				</Switch>
			</Box>
		</>
	);
};