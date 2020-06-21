import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core/';
import { Navbar, SignIn, SignUp } from './';
import NotFoundPage from '../common/notfound/NotFoundPage';
import { StudentsApi, AccountsApi } from '../../api';

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
		<Route exact path={path} component={component} key={key} />
	));
};

const HomePage = () => {
	const routes = [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/signin', component: SignIn },
		{ path: '/signup', component: SignUp },
	];

	// useEffect(() => {
	// 	(async () => {
	// 		const { data: students, error } = await StudentsApi.getAll();
	// 		console.log('STUDENTS GETALL');
	// 		console.log({ students });
	// 		console.log(error);
	// 	})();

	// 	(async () => {
	// 		const accountToSignIn = {
	// 			email: 'Gabrielle82@hotmail.com',
	// 			passwordHash: '0517ebf296f41a48f58f8292c8fd52b0462ddfc5',
	// 		};
	// 		const { data: account, error } = await AccountsApi.signIn(accountToSignIn);
	// 		console.log('ACCOUNT SIGNIN');
	// 		console.log({ account });
	// 		console.log(error);
	// 	})();
	// }, []);

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
