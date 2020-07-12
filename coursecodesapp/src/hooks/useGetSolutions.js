/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { solutionActions } from '../redux/actions';

export const useGetSolutions = (query = {}) => {
	const dispatch = useDispatch();
	const solutions = useSelector((state) => state.solution?.solutions);

	useEffect(() => {
		dispatch(solutionActions.getSolutions(query));
	}, []);
	return solutions;
};
