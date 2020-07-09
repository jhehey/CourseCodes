import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotFoundPage } from '.';
import { useSelector } from 'react-redux';
import { accountActions } from '../../redux/actions';

export const RouteComponents = ({ routes }) => {
	const { signInRedirect } = useSelector((state) => state.account);

	if (signInRedirect) {
		accountActions.signInFinish();
	}

	return (
		<>
			<Switch>
				{routes.map(({ path, component }, key) => (
					<Route exact path={path} component={component} key={key} />
				))}
				<Route path="*" component={NotFoundPage} />
			</Switch>
			{signInRedirect && <Redirect to="/" />}
		</>
	);
};
