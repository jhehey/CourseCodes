import React from 'react';
import { Button } from '@material-ui/core';
import { userActions } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// TODO: Redirect to home
export const Logout = ({ className = null }) => {
	const dispatch = useDispatch();

	const handleLogout = (event) => {
		event.preventDefault();
		dispatch(userActions.logOut());
	};

	const { loggedOut } = useSelector((state) => state.authentication);

	return (
		<>
			<Button color="primary" variant="contained" onClick={handleLogout} className={className}>
				Logout
			</Button>
			{loggedOut && <Redirect to="/" />}
		</>
	);
};
