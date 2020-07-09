import React from 'react';
import MaterialTable from 'material-table';
import { Grid, Button, Link, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProblems } from '../../hooks';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { courseActions } from '../../redux/actions';

export const StudentList = () => {
	const [tableState, setTableState] = React.useState({
		columns: [
			{ title: 'Name', field: 'fullName' },
			{ title: 'Email', field: 'email' },
		],
		data: [],
	});

	const dispatch = useDispatch();
	const courseToView = useSelector((state) => state.course?.courseToView);
	const courseId = courseToView?.id;
	console.log('StudentList');
	console.log(courseToView);

	React.useEffect(() => {
		if (courseId) {
			dispatch(courseActions.getStudentsByCourseId(courseId));
		}
	}, [dispatch, courseId]);

	const students = useSelector((state) => state.course?.students);
	console.log(students);
	React.useEffect(() => {
		setTableState((prevState) => {
			return { ...prevState, data: students };
		});
	}, [students]);

	const handleRowClick = (event, student) => {
		console.log(student);
		// const problemUrl = `${location.pathname}/${problem.id}`;
		// console.log(problemUrl);
		// // dispatch(courseActions.viewCourse(course));
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
