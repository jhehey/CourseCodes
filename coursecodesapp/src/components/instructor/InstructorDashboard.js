import React from 'react';
import clsx from 'clsx';
import { Box, Grid, Paper } from '@material-ui/core/';
import { Announcement } from '../common';
import { useStyles } from './useStyles';

export const InstructorDashboard = () => {
	const classes = useStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<Grid container spacing={3}>
			{/* Chart */}
			<Grid item xs={12} md={8} lg={9}>
				<Paper elevation={5} className={fixedHeightPaper}>
					<Box boxShadow={10} className={classes.header}>
						Instructor Notifications
					</Box>
					<Announcement />
				</Paper>
			</Grid>
		</Grid>
	);
};
