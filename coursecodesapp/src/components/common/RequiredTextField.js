import React from 'react';
import { TextField } from '@material-ui/core';
import { stringHelpers } from '../../helpers';

export const RequiredTextField = ({ name, register, error, id = '', type = 'text', autoFocus = false }) => {
	return (
		<TextField
			id={id ? id : name}
			name={name}
			inputRef={register({ required: 'This field is required' })}
			error={!!error}
			helperText={error ? error.message : ''}
			label={stringHelpers.toSentenceCase(name)}
			autoComplete="fname"
			variant="outlined"
			fullWidth
			autoFocus={autoFocus}
			required
			type={type}
		/>
	);
};
