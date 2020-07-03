import React from 'react';
import { Button } from '@material-ui/core';
import { accountActions } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const Logout = ({ className = null }) => {
	const dispatch = useDispatch();

	const handleLogout = (event) => {
		event.preventDefault();
		dispatch(accountActions.logOut());
	};

	const { loggedOut } = useSelector((state) => state.account);

	return (
		<>
			<Button color="primary" variant="contained" onClick={handleLogout} className={className}>
				Logout
			</Button>
			{loggedOut && <Redirect to="/" />}
		</>
	);
};
