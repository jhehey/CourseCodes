import React from 'react';
import { useSelector } from 'react-redux';

import { AlertPopup } from './common';
import { LandingPage, StudentPage, InstructorPage } from './common';
import { Role } from '../helpers';

const getHomepage = (signedIn, account) => {
	if (!signedIn || !account) {
		return <LandingPage />;
	}

	// signedIn is true, account is not null/undefined
	if (account.accountRole === Role.Student) {
		return <StudentPage />;
	}
	if (account.accountRole === Role.Instructor) {
		return <InstructorPage />;
	}

	// Invalid Account Role, just show homepage
	return <LandingPage />;
};

export const App = () => {
	// get the authentication details
	const { signedIn, signedAccount } = useSelector((state) => state.account);
	const HomePage = getHomepage(signedIn, signedAccount);

	return (
		<div className="App">
			<AlertPopup />
			{HomePage}
		</div>
	);
};
