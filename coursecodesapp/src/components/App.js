import React from 'react';
import { HomePage } from './landing';
import { AlertPopup } from './common';

import { useSelector } from 'react-redux';
import { AccountRoles } from '../helpers';

const StudentHome = () => {
	console.log('STUDENT HOME');
	return (
		<div>
			<h1>HELLO STUDENT</h1>
		</div>
	);
};

const InstructorHome = () => {
	console.log('INSTRUCTOR HOME');
	return (
		<div>
			<h1>HELLO Instructor</h1>
		</div>
	);
};

const getHomepage = (loggedIn, account) => {
	console.log('GET HOMEPAGE');
	console.log(loggedIn, account);
	console.log(!loggedIn, !account, !loggedIn || !account);

	if (!loggedIn || !account) {
		console.log(' HOME PAGE');
		return <HomePage />;
	}

	// loggedIn is true, account is not null/undefined
	if (account.accountRole === AccountRoles.Student) {
		return <StudentHome />;
	}
	if (account.accountRole === AccountRoles.Instructor) {
		return <InstructorHome />;
	}

	// Invalid Account Role, just show homepage
	console.log(' HOME PAGE');
	return <HomePage />;
};

export const App = () => {
	// get the authentication details
	const { loggedIn, account } = useSelector((state) => state.authentication);
	console.log(loggedIn, account);

	return (
		<div className="App">
			<AlertPopup />
			{getHomepage(loggedIn, account)}
		</div>
	);
};
