import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LandingPage } from './landing';
import { AlertPopup } from './common';
import { StudentHome } from './student';
import { InstructorHome } from './instructor';
import { AccountRoles } from '../helpers';

const getHomepage = (signedIn, account) => {
	if (!signedIn || !account) {
		return <LandingPage />;
	}

	// signedIn is true, account is not null/undefined
	if (account.accountRole === AccountRoles.Student) {
		return (
			<>
				<Redirect to="/" />
				<StudentHome />
			</>
		);
	}
	if (account.accountRole === AccountRoles.Instructor) {
		return (
			<>
				<Redirect to="/" />
				<InstructorHome />
			</>
		);
	}

	// Invalid Account Role, just show homepage
	return <LandingPage />;
};

export const App = () => {
	// get the authentication details
	const { signedIn, account } = useSelector((state) => state.authentication);
	console.log({ signedIn, account });
	const HomePage = getHomepage(signedIn, account);

	return (
		<div className="App">
			<AlertPopup />
			{HomePage}
		</div>
	);
};
