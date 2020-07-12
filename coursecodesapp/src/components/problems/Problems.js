import React from 'react';
import MaterialTable from 'material-table';
import { Button, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProblems, useGetSolutions } from '../../hooks';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { Role } from '../../helpers';
import { storage, keys } from '../../storage';
import { problemActions } from '../../redux/actions';

const InstructorProblems = () => {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	const courseToView = useSelector((state) => state.course?.courseToView);
	const courseId = courseToView.id;

	const [tableState, setTableState] = React.useState({
		columns: [
			{ title: 'Title', field: 'title' },
			{ title: 'No. of Test Cases', field: 'testCaseCount' },
			{ title: 'No. of Students Submitted', field: 'submitStatus' },
		],
		data: [],
	});

	const problems = useGetProblems({ courseId });
	const problemSubmitCounts = useSelector((state) => state.problem?.problemSubmitCounts);

	React.useEffect(() => {
		if (problems) {
			// get problem submit count
			const problemIds = problems.map((p) => p.id);
			const problemSubmitRequest = {
				courseId,
				problemIds,
			};
			dispatch(problemActions.getProblemSubmitCounts(problemSubmitRequest));
		}
	}, [problems, dispatch, courseId]);

	React.useEffect(() => {
		if (problems && problemSubmitCounts) {
			const data = problems.map((problem) => {
				const submitCounts = problemSubmitCounts.find((x) => x.problemId === problem.id);
				return {
					...problem,
					submitStatus: `${submitCounts?.submitCount} / ${submitCounts?.studentCount}`,
				};
			});
			setTableState((prevState) => ({ ...prevState, data }));
		}
	}, [problems, problemSubmitCounts]);

	const handleRowClick = (event, problem) => {
		const problemUrl = `${location.pathname}/${problem.id}`;
		history.push(problemUrl);
	};

	return (
		<Container>
			<Button
				variant="contained"
				style={{ background: '#37474f', color: '#eceff1', padding: '10px' }}
				startIcon={<AddCircleIcon />}
				href={`/courses/${courseId}/problems/create`}
			>
				Create Assignment
			</Button>

			<MaterialTable
				title="Assignments"
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

const StudentProblems = () => {
	const location = useLocation();
	const history = useHistory();
	const signedAccount = useSelector((state) => state.account?.signedAccount);

	const courseToView = useSelector((state) => state.course?.courseToView);
	const courseId = courseToView.id;

	// Get problems by course Id
	const problems = useGetProblems({ courseId });

	// get status for each problem if student has already submitted a solution
	const solutions = useGetSolutions({
		courseId,
		studentId: signedAccount.id,
	});

	const [tableState, setTableState] = React.useState({
		columns: [
			{ title: 'Title', field: 'title' },
			{ title: 'No. of Test Cases', field: 'testCaseCount' },
			{ title: 'Submission Status', field: 'submitted' },
		],
		data: [],
	});

	React.useEffect(() => {
		if (problems && solutions) {
			storage.set(keys.AssignmentSolutions(), solutions);

			const data = problems.map((problem) => {
				const solution = solutions.find((solution) => solution.problem.id === problem.id);
				return {
					...problem,
					status: solution?.status,
					submitted: (solution?.status === 1 && 'Submitted') || 'Not Submitted',
				};
			});

			// console.log(data);
			setTableState((prevState) => ({ ...prevState, data }));
		}
	}, [problems, solutions]);

	const handleRowClick = (event, problem) => {
		const problemUrl = `${location.pathname}/${problem.id}`;
		history.push(problemUrl);
	};

	return (
		<Container>
			<MaterialTable
				title="Assignments"
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

export const Problems = () => {
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;

	return (isStudent && <StudentProblems />) || (isInstructor && <InstructorProblems />) || <div>Invalid Account</div>;
};
