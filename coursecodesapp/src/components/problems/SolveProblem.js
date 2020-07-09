import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Paper, Tooltip } from '@material-ui/core';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrow';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import { green, red } from '@material-ui/core/colors';
import { CodeEditor } from '../codeeditor';
import { solutionActions } from '../../redux/actions';
import { ProblemDisplay, ResultsDisplay } from './';
import { keys, storage } from '../../storage';

const defaultValue = `\
#include <iostream>

int main() {
	std::cout << "Hello Worldss" << std::endl;
}
`;

export const SolveProblem = () => {
	const { problemId } = useParams();
	const dispatch = useDispatch();
	const isTesting = useSelector((state) => state.solution?.isTesting);

	// run
	const [sourceCode, setSourceCode] = useState(defaultValue);
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const studentId = signedAccount?.id;
	const solutionId = useSelector((state) => state.solution?.runResult?.solutionId);
	const handleRun = () => {
		// Go to results display
		setDisplay('results');
		if (isTesting) {
			return;
		}

		console.log('RUN');
		const solutionToRun = {
			solutionId,
			sourceCode,
			problemId,
			studentId,
		};
		console.log(solutionToRun);
		dispatch(solutionActions.runSolution(solutionToRun));
	};

	const handleCodeChanged = (value) => {
		console.log('On change');
		setSourceCode(value);

		// TODO: Maybe set the id? para alam kung same nung problem na sinesave
		// TODO: Ausin yung pag save ng source code
		// Dapat kapag, nag refresh, close, re-open, logout, basta kapag nagbago na, dapat yun na yon, hindi mawala ung code.
		// Kapag nag run, and submit. hindi rin dapat mawala
		console.log(keys.SavedSolutions(problemId, studentId));
		storage.set(keys.SavedSolutions(problemId, studentId), { sourceCode: value });
	};

	// get the saved source code in session storage. so that when user refresh, their code is not gone.
	React.useEffect(() => {
		if (problemId && studentId) {
			const locallySavedSolution = storage.get(keys.SavedSolutions(problemId, studentId));
			setSourceCode(locallySavedSolution?.sourceCode || sourceCode);
			console.log('GET SOURCE CODE', problemId, studentId);
			console.log(locallySavedSolution);
		}
	}, [problemId, studentId, sourceCode]);

	const [display, setDisplay] = useState('problem');

	return (
		<Grid container spacing={1} style={{ height: '90vh' }}>
			<Grid container item xs={6} spacing={0} direction="column">
				<Grid container item direction="row">
					<Paper variant="outlined" style={{ width: '100%' }}>
						<Tooltip title="Code" aria-label="code" placement="right">
							<IconButton onClick={() => setDisplay('problem')}>
								<CodeIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Results" aria-label="results" placement="right">
							<IconButton onClick={() => setDisplay('results')}>
								<FormatListBulletedOutlinedIcon />
							</IconButton>
						</Tooltip>
					</Paper>
				</Grid>
				<Grid container item>
					<Paper variant="outlined" style={{ width: '100%', padding: '2em' }}>
						{display === 'problem' && <ProblemDisplay />}
						{display === 'results' && <ResultsDisplay />}
					</Paper>
				</Grid>
			</Grid>
			<Grid container item xs={6} spacing={0} direction="column">
				<Grid item>
					<Paper variant="outlined">
						<Tooltip title="Run" aria-label="run">
							<IconButton onClick={handleRun}>
								<PlayArrowRoundedIcon style={{ color: isTesting ? red['A700'] : green['A700'] }} />
							</IconButton>
						</Tooltip>
					</Paper>
				</Grid>
				<Grid item>
					<Paper variant="outlined" style={{ height: '90vh' }}>
						<CodeEditor onChange={handleCodeChanged} initialValue={sourceCode} />
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
};
