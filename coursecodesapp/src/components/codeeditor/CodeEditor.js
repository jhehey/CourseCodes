import React from 'react';
import { useParams } from 'react-router-dom';
import { CppReservedWords } from './ReservedWords';
import { IntelliSenseTriggerKeys } from './IntelliSenseTriggerKeys';
import { useDispatch, useSelector } from 'react-redux';
import { solutionActions } from '../../redux/actions';

// Code Mirror
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/selection/active-line';
import { Pos, showHint } from 'codemirror';

import './style.css';

const hintFunction = (editor, options) => {
	const keywords = CppReservedWords;
	const WORD = /\b[^\d\W][\w]*(?=([^"]*"[^"]*")*[^"]*$)(?=([^']*'[^']*')*[^']*$)(?=([^`]*`[^`]*`)*[^`]*$)\b/;
	const RANGE = 500;

	let word = (options && options.word) || WORD;
	let range = (options && options.range) || RANGE;
	let cur = editor.getCursor(),
		curLine = editor.getLine(cur.line);
	let end = cur.ch,
		start = end;
	while (start && word.test(curLine.charAt(start - 1))) --start;
	let curWord = start !== end && curLine.slice(start, end);

	let list = (options && options.list) || [],
		seen = {};

	const checkText = (text) => {
		let m;
		while ((m = re.exec(text))) {
			if (m[0] === curLine || m[0] === curWord) continue;
			if ((!curWord || m[0].lastIndexOf(curWord, 0) === 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
				seen[m[0]] = true;
				list.push(m[0]);
			}
		}
	};

	// regex of words per line sa code
	let re = new RegExp(word.source, 'g');
	for (let dir = -1; dir <= 1; dir += 2) {
		let line = cur.line,
			endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
		for (; line !== endLine; line += dir) {
			let text = editor.getLine(line);
			checkText(text);
		}
	}

	// check dun sa keywords
	keywords.forEach((text) => {
		checkText(text);
	});

	return { list: list, from: Pos(cur.line, start), to: Pos(cur.line, end) };
};

export const CodeEditor = ({ readOnly = false, onRun = null }) => {
	const dispatch = useDispatch();
	const sourceCode = useSelector((state) => state.solution?.sourceCode);
	onRun.current.sourceCode = sourceCode;

	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const studentId = signedAccount?.id;
	const { problemId } = useParams();

	const handleOnChange = (data, value) => {
		// data represents change in the editor
		if (data) {
			dispatch(solutionActions.handleCodeEditorChanged(value, studentId, problemId));
		}
	};

	React.useEffect(() => {
		dispatch(solutionActions.getInitialSourceCode(studentId, problemId));
	}, [dispatch, studentId, problemId]);

	const currentSolution = useSelector((state) => state.solution?.currentSolution);
	if (currentSolution) {
		handleOnChange(true, currentSolution?.sourceCode);
	}
	console.log({ currentSolution }, currentSolution?.sourceCode);

	return (
		<CodeMirror
			value={sourceCode}
			autoCursor={false}
			options={{
				readOnly,
				mode: 'text/x-c++src',
				theme: 'dracula',
				tabSize: '2',
				lineNumbers: true,
				autoCloseTags: true,
				matchBrackets: true,
				autoCloseBrackets: true,
				scrollbarStyle: 'simple',
				styleActiveLine: true,
				showHint: true,
				extraKeys: {
					'Ctrl-Space': 'autocomplete',
				},
				hintOptions: {
					completeSingle: false,
					hint: hintFunction,
				},
			}}
			onKeyPress={(editor, event) => {
				if (IntelliSenseTriggerKeys[event.code]) {
					showHint(editor);
				}
			}}
			onChange={(editor, data, value) => handleOnChange(data, value)}
		/>
	);
};
