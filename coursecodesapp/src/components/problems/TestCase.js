import React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { toSentenceCase } from '../../helpers';

export const TestCaseItem = ({ name = '', value = '', rows = 5 }) => (
	<>
		<Typography variant="overline" style={{ fontWeight: 'bold' }}>
			{toSentenceCase(name)}
		</Typography>
		<TextField
			name={name}
			value={value}
			autoComplete="off"
			variant="outlined"
			fullWidth
			aria-readonly="true"
			type="text"
			multiline={true}
			rows={rows}
			rowsMax={5}
		/>
	</>
);

export const TestCaseContainer = ({ left, right, rows = 5 }) => {
	return (
		<Grid container item spacing={2}>
			<Grid item xs={6}>
				<TestCaseItem name={left.name} value={left.value} rows={rows} />
			</Grid>
			<Grid item xs={6}>
				<TestCaseItem name={right.name} value={right.value} rows={rows} />
			</Grid>
		</Grid>
	);
};
