import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	subTitle: {
		flexGrow: 1,
		marginLeft: '3vw',
		marginTop: '3vh',
		marginBottom: '3vh',
		fontWeight: '500',
		color: '#37474f',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 340,
		backgroundColor: '#fff',
	},
	tableHeight: {
		height: 340,
		width: '340',
		backgroundColor: '#fff',
	},
	header: {
		backgroundColor: '#37474f',
		height: '9vh',
		paddingTop: '3vh',
		paddingLeft: '4vw',
		marginBottom: '3vh',
		color: '#fff',
		fontSize: '1.5rem',
	},
}));
