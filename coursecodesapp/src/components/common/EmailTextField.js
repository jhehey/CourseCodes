import React from 'react';
import { TextField } from '@material-ui/core';
import { toSentenceCase } from '../../utils/stringUtils';

const EmailTextField = ({ id = '', name, register, error }) => {
	return (
		<TextField
			id={id ? id : name}
			name={name}
			inputRef={register({
				required: 'This field is required',
				pattern: {
					value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
					message: 'Invalid email address',
				},
			})}
			error={!!error}
			helperText={error ? error.message : ''}
			label={toSentenceCase(name)}
			autoComplete="off"
			variant="outlined"
			fullWidth
			required
		/>
	);
};

export default EmailTextField;
