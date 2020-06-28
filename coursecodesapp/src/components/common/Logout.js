import React from 'react';
import { Button } from '@material-ui/core';
import { userActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';

// TODO: Redirect to home
export const Logout = ({ className = null }) => {
	const dispatch = useDispatch();

	const handleLogout = (event) => {
		event.preventDefault();
		dispatch(userActions.logOut());
	};

	return (
		<Button color="primary" variant="contained" onClick={handleLogout} className={className}>
			Logout
		</Button>
	);
};
