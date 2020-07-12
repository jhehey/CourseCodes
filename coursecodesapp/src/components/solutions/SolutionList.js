import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSolutions } from '../../hooks';
import { Role } from '../../helpers';
import { Container } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { toDateString } from '../../helpers';

const StudentSolutionList = () => {
	const history = useHistory();
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isStudent = signedAccount.accountRole === Role.Student;
	const courseId = useSelector((state) => state.course?.courseToView?.id);

	const solutions = useGetSolutions({ studentId: isStudent && signedAccount.id, courseId });

	React.useEffect(() => {
		if (solutions) {
			const data = solutions.map((solution) => ({
				...solution,
				problemTitle: solution.problem.title,
				status: solution.status === 1 ? 'Submitted' : 'Not Submitted',
				dateSubmitted: toDateString(solution.dateSubmitted),
			}));
			setTableState((prevState) => ({
				...prevState,
				data,
			}));
		}
	}, [solutions]);

	const [tableState, setTableState] = React.useState({
		columns: [
			{ title: 'Problem Title', field: 'problemTitle' },
			{ title: 'Status', field: 'status' },
			{ title: 'Date Submitted', field: 'dateSubmitted' },
		],
		data: [],
	});

	const handleRowClick = (event, solution) => {
		const url = `/courses/${courseId}/solutions/${solution.id}`;
		history.push(url);
	};

	return (
		<Container>
			<MaterialTable
				title="Solutions"
				options={{
					headerStyle: { backgroundColor: '#37474f', color: '#eceff1' },
				}}
				columns={tableState.columns}
				data={tableState.data}
				onRowClick={handleRowClick}
			/>
		</Container>
	);
};

const InstructorSolutionList = () => {
	const history = useHistory();
	const courseId = useSelector((state) => state.course?.courseToView?.id);

	const solutions = useGetSolutions({ courseId });

	React.useEffect(() => {
		if (solutions) {
			const data = solutions.map((solution) => ({
				...solution,
				problemTitle: solution.problem.title,
				studentName: solution.student.fullName,
				email: solution.student.email,
				dateSubmitted: toDateString(solution.dateSubmitted),
			}));
			setTableState((prevState) => ({
				...prevState,
				data,
			}));
		}
	}, [solutions]);

	const [tableState, setTableState] = React.useState({
		columns: [
			{ title: 'Problem Title', field: 'problemTitle' },
			{ title: 'Name', field: 'studentName' },
			{ title: 'Email', field: 'email' },
			{ title: 'Date Submitted', field: 'dateSubmitted' },
		],
		data: [],
	});

	const handleRowClick = (event, solution) => {
		const url = `/courses/${courseId}/solutions/${solution.id}`;
		history.push(url);
	};

	return (
		<Container>
			<MaterialTable
				title="Solutions"
				options={{
					headerStyle: { backgroundColor: '#37474f', color: '#eceff1' },
				}}
				columns={tableState.columns}
				data={tableState.data}
				onRowClick={handleRowClick}
			/>
		</Container>
	);
};

export const SolutionList = () => {
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;

	return (
		(isStudent && <StudentSolutionList />) || (isInstructor && <InstructorSolutionList />) || <div>Invalid Account</div>
	);
};
