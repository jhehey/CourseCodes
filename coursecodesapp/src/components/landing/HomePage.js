import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core/';
import { Navbar, SignIn, SignUp } from './';

const HomePage = () => {
	return (
		<>
			<Navbar />
			<Box mt={15} mb={5}>
				<Switch>
					<Route path="/about">
						<div>
							<h1>About</h1>
						</div>
					</Route>
					<Route path="/signin">
						<SignIn />
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/">
						<div>
							<h1>Home</h1>
						</div>
					</Route>
				</Switch>
			</Box>
		</>
	);
};

export default HomePage;
