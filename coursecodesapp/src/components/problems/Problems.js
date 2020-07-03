import React from 'react';
import { Grid, Button, Link } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useGetProblems } from '../../hooks';

export const Problems = () => {
	const author = useSelector((state) => state.account?.signedAccount);
	const problems = useGetProblems({ authorId: author.accountId });

	const problemList = problems?.map((problem) => (
		<React.Fragment key={problem.id}>
			<Link href={`/problems/${problem.id}`} variant="h4">
				{problem.title}
			</Link>
			<h4>{problem.statement}</h4>
		</React.Fragment>
	));

	return (
		<Grid container>
			<Grid container item xs={3}>
				<Grid item xs={12}>
					<Button href="/problems/create" variant="contained" color="primary">
						Create New Problem
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={9}>
				<h1>Problem List</h1>
				{problemList}
			</Grid>
		</Grid>
	);
};
