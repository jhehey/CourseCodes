import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Role } from '../../helpers';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const AnnouncementAlert = ({ text }) => {
	const [open, setOpen] = React.useState(true);
	console.log(text);
	return (
		<>
			<Collapse in={open}>
				<Alert
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					{text}
				</Alert>
			</Collapse>
		</>
	);
};

export const Announcement = () => {
	const classes = useStyles();
	const { signedAccount } = useSelector((state) => state.account);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;

	const studentAnnouncements = [
		'Welcome to CourseCodes',
		'Practice your C++ Programming Skills Through Hands-on Learning',
		'Ask your Instructor for the Join Code to Enroll in a Course',
		'Have Fun and Keep Learning',
	];

	const instructorAccouncements = [
		'Welcome to CourseCodes',
		'Create Courses for your students to join',
		'Give the Auto-Generated Join Code to your students for them to join your courses',
		'Allow your students answer C++ Programming Problems to enhance their hands-on skills',
		'Have Fun and Keep Learning',
	];

	return (
		<div className={classes.root}>
			{isStudent &&
				studentAnnouncements.map((x, index) => <AnnouncementAlert key={`announcement-${index}`} text={x} />)}
			{isInstructor &&
				instructorAccouncements.map((x, index) => <AnnouncementAlert key={`announcement-${index}`} text={x} />)}
		</div>
	);
};
