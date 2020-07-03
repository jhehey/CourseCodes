import React from 'react';
import { TextField } from '@material-ui/core';
import { stringHelpers } from '../../helpers';

export const RequiredTextField = ({
	name,
	register = null,
	error = null,
	id = '',
	type = 'text',
	autoFocus = false,
	label = null,
	...props
}) => {
	return (
		<TextField
			id={id || name}
			name={name}
			inputRef={register({ required: 'This field is required' })}
			error={!!error}
			helperText={error ? error.message : ''}
			label={label || stringHelpers.toSentenceCase(name)}
			autoComplete="off"
			variant="outlined"
			fullWidth
			autoFocus={autoFocus}
			required
			type={type}
			{...props}
		/>
	);
};
