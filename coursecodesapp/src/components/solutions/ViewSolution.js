import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { solutionActions } from '../../redux/actions';
import { Container, Typography } from '@material-ui/core';
import { CodeEditor } from '../codeeditor';

export const ViewSolution = () => {
	const dispatch = useDispatch();
	const { solutionId } = useParams();

	const solution = useSelector((state) => state.solution?.solution);
	console.log('View Solution', solutionId);
	console.log(solution);
	React.useEffect(() => {
		dispatch(solutionActions.getSolution(solutionId));
	}, [dispatch, solutionId]);

	return (
		<Container>
			<Typography>Date Submitted: {solution?.dateSubmitted}</Typography>
			<CodeEditor readOnly={true} initialValue={solution?.sourceCode} />
		</Container>
	);
};
