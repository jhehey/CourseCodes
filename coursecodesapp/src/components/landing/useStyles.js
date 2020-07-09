import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: 'white',
		width: '100%',
		opacity: 0.9,
		borderRadius: '20px',
		paddingBottom: theme.spacing(5),
		paddingRight: theme.spacing(4),
		paddingLeft: theme.spacing(4),
		marginBottom: theme.spacing(10),
		minHeight: theme.spacing(10),
	},
	paper: {
		marginTop: theme.spacing(12),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		marginTop: theme.spacing(3),
	},
	signUpForm: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	signInForm: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},

	//HomePage
	hero: {
		height: '70vh',
		width: '100%',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		position: 'relative',
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			height: 300,
			fontSize: '3em',
		},
	},
	hero2: {
		height: '100vh',
		width: '100%',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		position: 'absolute',
		display: 'inline-block',
	},
	header: {
		marginLeft: '10vw',
		marginTop: '20vh',
		color: '#37474f',
		fontFamily: 'monospace',
		fontWeight: '500',
		fontSize: '4rem',
	},
	sub: {
		marginLeft: '20vw',
		marginTop: '5vh',
		color: '#37474f',
		fontWeight: '500',
		fontFamily: 'monospace',
		fontSize: '2rem',
	},
	features: {
		paddingTop: theme.spacing(3),
		marginTop: '-10vh',
		height: '60vh',
	},
	about: {
		paddingTop: theme.spacing(3),
		height: '90vh',
	},
	card: {
		maxWidth: '80%',
	},
	media: {
		height: 200,
	},
	cardAbout: {
		variant: 'outlined',
		maxWidth: '80%',
		margin: 'auto',
		position: 'relative',
		marginTop: '10vh',
		backgroundColor: 'transparent',
	},
}));
