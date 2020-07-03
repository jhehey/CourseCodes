import React from 'react';
import { Button } from '@material-ui/core';
import { accountActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export const Logout = ({ className = null }) => {
	const dispatch = useDispatch();

	const handleLogout = (event) => {
		event.preventDefault();
		dispatch(accountActions.logOut());
	};

	return (
		<>
			<Button color="primary" variant="contained" onClick={handleLogout} className={className}>
				Logout
			</Button>
		</>
	);
};
