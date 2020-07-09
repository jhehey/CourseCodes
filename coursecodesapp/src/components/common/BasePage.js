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
	const { signInRedirect } = useSelector((state) => state.account);

	if (signInRedirect) {
		accountActions.signInFinish();
	}

	return (
		<>
			<Box style={{ height: '100%' }}>
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
	const { signedIn } = useSelector((state) => state.account);

	return (
		<>
			<Box>
				<Navbar routes={pageRoutes.landing} signedIn={signedIn} />
			</Box>
			<BasePage routes={pageRoutes.landing} />;
		</>
	);
};
