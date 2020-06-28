import React from 'react';
import { Button } from '@material-ui/core';
import { userActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export const Logout = () => {
	const dispatch = useDispatch();

	const handleLogout = (event) => {
		event.preventDefault();
		console.log('Logout');
		dispatch(userActions.logOut());
	};

	return (
		<Button color="primary" variant="contained" onClick={handleLogout}>
			Logout
		</Button>
	);
};
