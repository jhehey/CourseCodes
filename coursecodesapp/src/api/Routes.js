const baseUrl = `${process.env.REACT_APP_API}`;

const Routes = {
	Accounts: `${baseUrl}/accounts`,
	Students: `${baseUrl}/students`,
	Instructors: `${baseUrl}/instructors`,
	Courses: `${baseUrl}/courses`,
	Problems: `${baseUrl}/problems`,
};

export default Routes;
