import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Paper, Tooltip } from '@material-ui/core';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrow';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import { green, red } from '@material-ui/core/colors';
import { CodeEditor } from '../codeeditor';
import { solutionActions, alertActions } from '../../redux/actions';
import { ProblemDisplay, ResultsDisplay } from './';
import PublishIcon from '@material-ui/icons/Publish';

export const SolveProblem = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const isTesting = useSelector((state) => state.solution?.isTesting);

	// run
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const studentId = signedAccount?.id;
	const runResult = useSelector((state) => state.solution?.runResult);
	let solutionId = runResult?.solutionId;
	const courseProblemId = useSelector((state) => state.problem?.problem?.courseProblemId);

	// get current solution
	const currentSolution = useSelector((state) => state.solution?.currentSolution);
	React.useEffect(() => {
		if (studentId && courseProblemId) {
			dispatch(solutionActions.getCurrentSolution({ studentId, courseProblemId }));
		}
	}, [dispatch, studentId, courseProblemId]);
	if (currentSolution) {
		solutionId = currentSolution.id;
	}

	const onRun = React.useRef({ sourceCode: null });
	const handleRun = () => {
		// Go to results display
		setDisplay('results');
		if (isTesting) {
			return;
		}

		console.log('RUN');
		const solutionToRun = {
			solutionId,
			sourceCode: onRun.current.sourceCode,
			courseProblemId,
			studentId,
		};
		console.log(solutionToRun);
		dispatch(alertActions.info({ message: 'Testing your solution' }));
		dispatch(solutionActions.runSolution(solutionToRun));
	};

	const solution = useSelector((state) => state.solution?.solution);
	const submitted = solution?.status === 1;

	const passed = runResult?.passed;
	if (passed && !submitted) {
		dispatch(alertActions.success({ message: 'Congratulations! You completed the problem. You may now submit it' }));
	}

	const [display, setDisplay] = useState('problem');

	const handleSubmit = () => {
		if (!passed) {
			dispatch(alertActions.error({ message: 'You must pass all test cases to submit your solution' }));
		} else {
			dispatch(alertActions.info({ message: 'Submitting your solution' }));
			console.log('SUBMIT', solutionId);
			// TODO: SEND REQUEST TO API, give solutionId, then update status to submitted
			dispatch(solutionActions.submitSolution(solutionId));
		}
	};

	const courseId = useSelector((state) => state.course?.courseToView?.id);
	if (submitted) {
		history.push(`/courses/${courseId}/problems`);
	}

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
						<Tooltip title="Submit" aria-label="submit">
							<IconButton onClick={handleSubmit}>
								<PublishIcon style={{ color: !passed ? red['A700'] : green['A700'] }} />
							</IconButton>
						</Tooltip>
					</Paper>
				</Grid>
				<Grid item>
					<Paper variant="outlined" style={{ height: '90vh' }}>
						<CodeEditor onRun={onRun} />
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
};
