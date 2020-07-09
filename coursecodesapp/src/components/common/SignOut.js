import React from 'react';
import { Typography } from '@material-ui/core';
import { accountActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export const SignOut = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(accountActions.logOut());
	}, [dispatch]);

	return <Typography variant="h3"> Signing Out...</Typography>;
};
