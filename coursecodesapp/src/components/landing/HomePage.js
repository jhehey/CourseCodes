import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core/';
import { Navbar, SignIn, SignUp } from './';
import NotFoundPage from '../common/notfound/NotFoundPage';

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

const About = () => {
	return (
		<div>
			<h1>About</h1>
		</div>
	);
};

const getRouteComponents = (routes) => {
	return routes.map(({ path, component }, key) => (
		<Route exact path={path} component={component} />
	));
};

const HomePage = () => {
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

export default HomePage;
