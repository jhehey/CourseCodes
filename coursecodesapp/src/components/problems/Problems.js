import React from 'react';
import MaterialTable from 'material-table';
import { Grid, Button, Link, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useGetProblems } from '../../hooks';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { Role } from '../../helpers';

export const Problems = () => {
	const location = useLocation();
	const history = useHistory();
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;

	const courseToView = useSelector((state) => state.course?.courseToView);
	const courseId = courseToView.id;
	console.log('PROBLEMS');
	console.log(courseToView);

	// Get problems by course Id
	const problems = useGetProblems({ courseId });
	// const author = useSelector((state) => state.account?.signedAccount);
	// const problems = useGetProblems({ authorId: author.accountId });

	// const problemList = problems?.map((problem) => (
	// 	<React.Fragment key={problem.id}>
	// 		<Link href={`/courses/${courseId}/problems/${problem.id}`} variant="h4">
	// 			{problem.title}
	// 		</Link>
	// 		<h4>{problem.statement}</h4>
	// 	</React.Fragment>
	// ));

	console.log(problems);

	const [tableState, setTableState] = React.useState({
		columns: [
			{ title: 'Title', field: 'title' },
			{ title: 'No. of Test Cases', field: 'testCaseCount' },
		],
		data: [],
	});

	React.useEffect(() => {
		if (problems) {
			setTableState((prevState) => ({ ...prevState, data: problems }));
		}
	}, [problems]);

	const handleRowClick = (event, problem) => {
		const problemUrl = `${location.pathname}/${problem.id}`;
		console.log(problemUrl);
		// dispatch(courseActions.viewCourse(course));
		history.push(problemUrl);
	};

	return (
		<Container>
			{isInstructor && (
				<Button
					variant="contained"
					style={{ background: '#37474f', color: '#eceff1', padding: '10px' }}
					startIcon={<AddCircleIcon />}
					href={`/courses/${courseId}/problems/create`}
				>
					Create Assignment
				</Button>
			)}

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

		// <Grid container>
		// 	<Grid container item xs={3}>
		// 		<Grid item xs={12}>
		// 			<Button href={`/courses/${courseId}/problems/create`} variant="contained" color="primary">
		// 				Create New Problem
		// 			</Button>
		// 		</Grid>
		// 	</Grid>
		// 	<Grid item xs={9}>
		// 		<h1>Problem List</h1>
		// 		{problemList}
		// 	</Grid>
		// </Grid>
	);
};
