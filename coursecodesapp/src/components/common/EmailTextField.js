import React from 'react';
import { TextField } from '@material-ui/core';
import { stringHelpers } from '../../helpers';

export const EmailTextField = ({ id = '', name, register, error }) => {
	return (
		<TextField
			id={id ? id : name}
			name={name}
			inputRef={register({
				required: 'This field is required',
				pattern: {
					value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
					message: 'Invalid Email Address',
				},
			})}
			error={!!error}
			helperText={error ? error.message : ''}
			label={stringHelpers.toSentenceCase(name)}
			autoComplete="off"
			variant="outlined"
			fullWidth
			required
		/>
	);
};

// /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+ @ [a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
