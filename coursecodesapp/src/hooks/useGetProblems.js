/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { problemActions } from '../redux/actions';

export const useGetProblems = (query = {}) => {
	const dispatch = useDispatch();
	const problems = useSelector((state) => state.problem?.problems);

	useEffect(() => {
		dispatch(problemActions.getProblems(query));
	}, []);
	return problems;
};
