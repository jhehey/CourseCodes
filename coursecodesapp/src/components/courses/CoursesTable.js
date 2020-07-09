import React from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { courseActions } from '../../redux/actions';
import { Role } from '../../helpers';
import { useGetCourses } from '../../hooks';

export const CoursesTable = () => {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	// get courses based on type of account
	const { signedAccount } = useSelector((state) => state.account);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;
	const query = isInstructor ? { instructorId: signedAccount.id } : isStudent ? { studentId: signedAccount.id } : null;
	const courses = useGetCourses(query);
	console.log('COURSES TABLE');
	console.log(courses);

	React.useEffect(() => {
		const data = courses?.map((course) => {
			return {
				...course,
				dateCreated: new Date(course.dateCreated).toDateString('').slice(4),
				dateJoined: isStudent ? new Date(course.dateJoined).toDateString('').slice(4) : course.dateJoined,
			};
		});
		if (courses) {
			setTableState((prevState) => {
				return { ...prevState, data };
			});
		}
	}, [courses, isStudent]);

	const instructorColumns = [
		{ title: 'Course Name', field: 'courseName' },
		{ title: 'Term', field: 'term' },
		{ title: 'Section', field: 'section' },
		{ title: 'Date Created', field: 'dateCreated' },
	];

	const studentColumns = [
		{ title: 'Course Name', field: 'courseName' },
		{ title: 'Term', field: 'term' },
		{ title: 'Section', field: 'section' },
		{ title: 'Date Joined', field: 'dateJoined' },
	];

	const [tableState, setTableState] = React.useState({
		columns: isInstructor ? instructorColumns : studentColumns,
		data: [
			// { courseName: 'COE113L', term: '4Q SY 2019-2020', section: 'B1', dateCreated: 'July 3, 2020' },
			// { courseName: 'COE113L', term: '4Q SY 2019-2020', section: 'B1', dateCreated: 'July 3, 2020' },
			// { courseName: 'COE113L', term: '4Q SY 2019-2020', section: 'B1', dateCreated: 'July 3, 2020' },
			// { courseName: 'COE113L', term: '4Q SY 2019-2020', section: 'B1', dateCreated: 'July 3, 2020' },
			// { courseName: 'COE113L', term: '4Q SY 2019-2020', section: 'B1', dateCreated: 'July 3, 2020' },
		],
	});

	const handleRowClick = (event, course) => {
		const courseUrl = `${location.pathname}/${course.id}`;
		console.log(courseUrl);
		dispatch(courseActions.viewCourse(course));
		history.push(courseUrl);
	};

	return (
		<MaterialTable
			title="Manage Course List"
			options={{
				headerStyle: { backgroundColor: '#37474f', color: '#eceff1' },
			}}
			columns={tableState.columns}
			data={tableState.data}
			onRowClick={handleRowClick}
			editable={
				isInstructor && {
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								resolve();
								if (oldData) {
									setTableState((prevState) => {
										const data = [...prevState.data];
										data[data.indexOf(oldData)] = newData;
										return { ...prevState, data };
									});
								}
							}, 600);
						}),
					onRowDelete: (oldData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								resolve();
								setTableState((prevState) => {
									const data = [...prevState.data];
									data.splice(data.indexOf(oldData), 1);
									return { ...prevState, data };
								});
							}, 600);
						}),
				}
			}
		/>
	);
};
