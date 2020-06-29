import React from 'react';
import { Grid, Button } from '@material-ui/core';

export const Problems = () => {
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
				<h1>Problem 1</h1>
				<h1>Problem 2</h1>
				<h1>Problem 3</h1>
			</Grid>
		</Grid>
	);
};
