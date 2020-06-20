import React from 'react';
import { TextField } from '@material-ui/core';
import { toSentenceCase } from '../../utils/stringUtils';

const RequiredTextField = ({ id = '', name, register, error }) => {
	return (
		<TextField
			id={id ? id : name}
			name={name}
			inputRef={register({ required: 'This field is required' })}
			error={!!error}
			helperText={error ? error.message : ''}
			label={toSentenceCase(name)}
			autoComplete="fname"
			variant="outlined"
			fullWidth
			autoFocus
			required
		/>
	);
};

export default RequiredTextField;
