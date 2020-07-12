import React from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from 'react-redux';
import { courseActions } from '../../redux/actions';
import { toDateString } from '../../helpers';

export const StudentList = () => {
	const [tableState, setTableState] = React.useState({
		columns: [
			{ title: 'Name', field: 'fullName' },
			{ title: 'Email', field: 'email' },
			{ title: 'Date Registered', field: 'dateRegistered' },
		],
		data: [],
	});

	const dispatch = useDispatch();
	const courseToView = useSelector((state) => state.course?.courseToView);
	const courseId = courseToView?.id;

	React.useEffect(() => {
		if (courseId) {
			dispatch(courseActions.getStudentsByCourseId(courseId));
		}
	}, [dispatch, courseId]);

	const students = useSelector((state) => state.course?.students);
	console.log(students);
	React.useEffect(() => {
		const data = students?.map((student) => ({
			...student,
			dateRegistered: toDateString(student.dateRegistered),
		}));
		setTableState((prevState) => ({ ...prevState, data }));
	}, [students]);

	const handleRowClick = (event, student) => {
		console.log(student);
		// const problemUrl = `${location.pathname}/${problem.id}`;
		// console.log(problemUrl);
		// history.push(problemUrl);
	};

	return (
		<MaterialTable
			title="Student List"
			options={{
				headerStyle: { backgroundColor: '#37474f', color: '#eceff1' },
			}}
			columns={tableState.columns}
			data={tableState.data}
			onRowClick={handleRowClick}
		/>
	);
};
