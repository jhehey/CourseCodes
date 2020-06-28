import React from 'react';
import { useSelector } from 'react-redux';

import { AccountRoles } from '../helpers';

import { AlertPopup } from './common';
import { LandingPage, StudentPage, InstructorPage } from './common';

const getHomepage = (signedIn, account) => {
	if (!signedIn || !account) {
		return <LandingPage />;
	}

	// signedIn is true, account is not null/undefined
	if (account.accountRole === AccountRoles.Student) {
		return <StudentPage />;
	}
	if (account.accountRole === AccountRoles.Instructor) {
		return <InstructorPage />;
	}

	// Invalid Account Role, just show homepage
	return <LandingPage />;
};

export const App = () => {
	// get the authentication details
	const { signedIn, account } = useSelector((state) => state.authentication);
	const HomePage = getHomepage(signedIn, account);

	return (
		<div className="App">
			<AlertPopup />
			{HomePage}
		</div>
	);
};
