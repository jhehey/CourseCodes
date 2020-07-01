import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Chip, Input, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
		background: '#ff1744',
		color: 'white',
		fontWeight: 'bold',
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const getStyles = (selectedItem, items, keyName, theme) => {
	// if an item is selected, make its font bold
	return {
		fontWeight:
			items.findIndex((item) => item[keyName] === selectedItem[keyName]) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightBold,
	};
};

export const ChipSelect = ({
	handleItemSelected,
	valueName,
	chipLabel = 'Select Items',
	selectedItems = [],
	items = [],
	keyName = 'id',
}) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<FormControl className={classes.formControl} fullWidth>
			<InputLabel id="demo-mutiple-chip-label">{chipLabel}</InputLabel>
			<Select
				labelId="demo-mutiple-chip-label"
				id="demo-mutiple-chip"
				multiple
				value={selectedItems}
				onChange={handleItemSelected}
				input={<Input id="select-multiple-chip" />}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{selected.map((item) => (
							<Chip key={item[keyName]} label={item[valueName]} className={classes.chip} />
						))}
					</div>
				)}
				MenuProps={MenuProps}
			>
				{items?.map((item) => (
					<MenuItem key={item[keyName]} value={item} style={getStyles(item, selectedItems, keyName, theme)}>
						{item[valueName]}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
